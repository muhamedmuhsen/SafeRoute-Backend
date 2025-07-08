module.export = (aysncFunction) => {
  return (req, res, next) => {
    aysncFunction(req, res, next).catch((err) => next(err));
  };
};
