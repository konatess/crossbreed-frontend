
const regexkey = {
    username: '',
    password: {
        capLetter: /[A-Z]/,
        lowLetter: /[a-z]/,
        special: /[ !#$%&*,./?@^_`~]/
    },
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    petname: /[^ 0-9a-z]+/i
};

export default {
    
    username: () => {

    },
    password: (input) => {
        const requirements = `Passwords must: 
    - be at least 8 characters long
    - have at least one uppercase and one lowercase letter
    - have a least one space inside (not at the end or beginning) or one of these special characters: 
    ! # $ % & * , . / ? @ ^ _ \` ~`
        if(input.length < 8) {
            return {
                title: "Your password is too short. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.capLetter.test(input)) {
            return {
                title: "Your password needs an UPPERCASE letter. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.lowLetter.test(input)) {
            return {
                title: "Your password needs a lowercase letter. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.special.test(input)) {
            return {
                title: "Your password needs a special character. ", 
                message: requirements
            };
        }
        else {
            return "Success"
        }
    },

    email: (input) => {
        if(!regexkey.email.test(input)){
            console.log("failed regex");
            return {
                title: "Invalid Email",
                message: "Please enter a valid email!"
            }
        }
        else{
            return "Success"
        }
    },

    petname: (input) => {
        if(!input) {
            return "Your pet needs a name."
        }
        else if (input.length > 50) {
            return "Your pet's name cannot be longer than 50 characters."
        }
        else if (regexkey.petname.test(input)){
            return "You pet's name cannot include special characters."
        }
        else {
            return "Success"
        }
    }
} 