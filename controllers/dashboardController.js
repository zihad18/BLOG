exports.dashboardGetController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', { title: 'My Dashboard' }) // views/pages/dashboard/dashboard.ejs  
}    