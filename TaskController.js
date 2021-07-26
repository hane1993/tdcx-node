const { db, admin } = require('./firebase');

const tasksDb = db.collection('tasks');

exports.tasks = async (req, res) => {
  const tasks = {};

  if (!req.query.search) {
    await tasksDb
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          tasks[doc.id] = doc.data();
        });
      })
      .then(() => {
        res.status(200).send(JSON.stringify(tasks));
      });
  } else {
    await tasksDb
      .where('task', '==', req.query.search)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          tasks[doc.id] = doc.data();
        });
      })
      .then(() => {
        res.status(200).send(JSON.stringify(tasks));
      });
  }
};

exports.store = async (req, res) => {
  const newObj = {};
  const { task } = req.body;

  const data = {
    task,
    isComplete: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await tasksDb
    .add(data)
    .then((resp) => {
      data['id'] = resp.id;
      newObj['task'] = data;
      res.status(200).send(JSON.stringify(newObj));
    })
    .catch((error) => res.status(500).send(error));
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const data = req.body;
  data['updatedAt'] = admin.firestore.FieldValue.serverTimestamp();

  await tasksDb
    .doc(id)
    .update(data)
    .then((resp) => res.status(200).send(resp))
    .catch((error) => res.status(500).send(error));
};

exports.task = async (req, res) => {
  const id = req.params.id;

  await tasksDb
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        res.status(200).send({ task: doc.data() });
      } else {
        res.status(200).send({ task: '' });
      }
    })
    .catch((error) => res.status(500).send(error));
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;

  await tasksDb
    .doc(id)
    .delete()
    .then((resp) => res.status(200).send(resp))
    .catch((error) => res.status(500).send(error));
};
