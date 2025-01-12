const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {
    
    console.log(Flash.getMessage(req))

    res.render('playground/signup', { title: 'Validator Playground' })
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username Can not be Empty')
            .isLength({ max: 15 })
            .withMessage('Username Must be less than 15 Chars')
            .trim(),
        check('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Please Provide a valid Email'),
        check('password').custom( value =>{
            if(value.length < 5){
                throw new Error('Password Must be greater than 5 Chars')
            }
            return true
        }),
        check('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Password Does not Match')
            }
            return true
        })  
    ],
    (req, res, next) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash('failed', 'There is some error')
    }else{
        req.flash('success', 'There is no error')
    }

    res.redirect('/playground/validator')
})

module.exports = router;