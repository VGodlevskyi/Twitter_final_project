import * as yup from 'yup';

const registrationSchema = yup.object().shape({
    email: yup
        .string()
        .email('invalid email format')
        .required('this field is required'),
    firstName: yup
        .string()
        .required('this field is required')
        .min(2, 'Min length 2')
        .max(255, 'Max length 255'),
    lastName: yup
        .string()
        .required('this field is required')
        .min(2, 'Min length 2')
        .max(255, 'Max length 255'),
    password: yup
        .string()
        .required('this field is required')
        .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
});

const changePassSchema = yup.object().shape({
    userinfo: yup
        .string()
        .required('this field is required')
        .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirm: yup
        .string()
        .oneOf([yup.ref("userinfo"), null], "Passwords must match")
})

export default {
    registrationSchema,
    changePassSchema
}
