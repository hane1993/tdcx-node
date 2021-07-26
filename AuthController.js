exports.login = (req, res) => {
  const { id, name } = req.body;

  if (id === '1' && name === 'Hane') {
    res.status(200).send({
      success: true,
      message: 'Login Successfull!',
    });
  } else {
    res.status(500).send({
      success: false,
      message: 'Please try again!',
    });
  }
};
