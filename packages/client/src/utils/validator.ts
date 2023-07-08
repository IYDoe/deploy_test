export function validator(string: string | undefined, type: string, secondString?: string) {
    let result;

    if (!string) {
        return
    }

    switch (type) {
    case 'first_name':
    case 'second_name':
        result = new RegExp('^[A-ZА-Я][a-zA-ZА-Яа-я\\-]*$');
        return result.test(string);
    case 'login':
    case 'display_name':
        result = new RegExp('^(?=.*[A-Za-z])(?:[a-zA-Z0-9_-]){3,20}$');
        return result.test(string);
    case 'email':
        result = new RegExp(/^[a-zA-Z0-9-.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/);
        return result.test(string);
    case 'phone':
        result = new RegExp('^\\+?[0-9]{10,15}$');
        return result.test(string);
    case 'password':
    case 'newPassword':
        result = new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(?:[a-zA-Z0-9_-]+){8,40}$');
        return result.test(string);
    case 'passwordRepeat':
        return string === secondString
    }
}
