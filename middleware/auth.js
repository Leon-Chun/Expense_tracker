module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {     //true 就進入下一個 middleware
      return next()
    }
    res.redirect('/users/login')    // false就強制返回 login 頁面
  }
}