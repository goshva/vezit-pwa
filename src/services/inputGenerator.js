// Создаем список полей для формы 
// key должен совпадать с названием поля в базе данных и с id
// поле должно содержать id, placeholder, type, model, rules


const fieldsInfo = {
    'last_name': {
        id: "last_name",
        placeholder: "Фамилия",
        type: "text",
        model: "last_name",
        rules: [(val) => val?.trim() !== ""]
    },
    'first_name': {
        id: "first_name",
        placeholder: "Имя",
        type: "text",
        model: "first_name",
        rules: [(val) => val?.trim() !== ""]
    },
    'email': {
        id: "email",
        placeholder: "Электронная почта",
        type: "email",
        model: "email",
        rules: [(val) => /^\S+@\S+\.\S+$/.test(val)]
    },
    'phone': {
        id: "phone",
        placeholder: "Контактный телефон",
        type: "text",
        model: "phone",
        rules: [(val) => val?.trim() !== ""]
    },
    'city': {
        id: "city",
        placeholder: "Город",
        type: "text",
        model: "city",
        rules: [(val) => val?.trim() !== ""]
    },
    'planned_clients': {
        id: "planned_clients",
        placeholder: "Кол-во клиентов в плане",
        type: "number",
        model: "planned_clients",
        rules: [(val) => !isNaN(Number(val)), (val) => val > 0, (val) => Number.isInteger(Number(val))]
    },
    "name": { id: "name", placeholder: "Название", type: "text", model: "name", rules: [(val) => val?.trim() !== ""] },
    "INN": { id: "INN", placeholder: "ИНН", type: "text", model: "INN", rules: [(val) => val?.trim().length <= 13] },
    "BIK": { id: "BIK", placeholder: "БИК", type: "text", model: "BIK", rules: [(val) => val?.trim().length <= 9] },
    "OGRN": { id: "OGRN", placeholder: "ОГРН", type: "text", model: "OGRN", rules: [(val) => val?.trim() !== ""] },
    "bussines": { id: "bussines", placeholder: "Название компании", type: "text", model: "bussines", rules: [(val) => val?.trim() !== ""] },
    "description": { id: "description", placeholder: "Описание", type: "text", model: "description", rules: [(val) => val?.trim() !== ""] },
    "contactName": { id: "contactName", placeholder: "ФИО", type: "text", model: "contactName", rules: [(val) => val?.trim() !== ""] },
    "actualAddress": { id: "actualAddress", placeholder: "Фактический адрес", type: "text", model: "actualAddress", rules: [(val) => val?.trim().length <= 512] },
    "OKVED": { id: "OKVED", placeholder: "Вид деятельности", type: "text", model: "OKVED", rules: [(val) => val?.trim().length <= 512] },
    "contactTel": { id: "contactTel", placeholder: "Контактный телефон", type: "text", model: "contactTel", rules: [(val) => val?.trim() !== ""] },
    "contactEMail": { id: "contactEMail", placeholder: "Электронная почта", type: "email", model: "contactEMail", rules: [(val) => /^\S+@\S+\.\S+$/.test(val)] },
    "legalAddress": { id: "legalAddress", placeholder: "Юридический адрес", type: "text", model: "legalAddress", rules: [(val) => val?.trim().length <= 512] },
    "equipid": { id: "equipid", placeholder: "ID", type: "text", model: "equipid", rules: [(val) => val?.trim() !== ""] },
    "sid": { id: "sid", placeholder: "ID сервиса", type: "text", model: "sid", rules: [(val) => val?.trim() !== ""] },
    "apikey": { id: "apikey", placeholder: "API ключ", type: "text", model: "apikey", rules: [(val) => val?.trim() !== ""] },
    "ver": { id: "ver", placeholder: "Версия", type: "text", model: "ver", rules: [(val) => val?.trim() !== ""] },
    "dsc": { id: "dsc", placeholder: "Описание", type: "text", model: "dsc", rules: [(val) => val?.trim() !== ""] },
    "listing": { id: "listing", placeholder: "Список", type: "text", model: "listing", rules: [(val) => val?.trim() !== ""] },
    "companyname": { id: "companyname", placeholder: "Название компании", type: "text", model: "companyname", rules: [(val) => val?.trim() !== ""] },
    "companyrole": { id: "companyrole", placeholder: "Роль в компании", type: "text", model: "companyrole", rules: [(val) => val?.trim() !== ""] },
    "fullusername": { id: "fullusername", placeholder: "ФИО", type: "text", model: "fullusername", rules: [(val) => val?.trim() !== ""] },
    "password": { id: "password", placeholder: "Пароль", type: "password", model: "password", rules: [(val) => val?.trim() !== ""] },
    "filename": { id: "filename", placeholder: "Название файла", type: "file", model: "filename", rules: [(val) => val?.trim() !== ""] },
    "serverfilename": { id: "serverfilename", placeholder: "Название файла на сервере", type: "text", model: "serverfilename", rules: [(val) => val?.trim() !== ""] },
    "url": { id: "url", placeholder: "URL", type: "text", model: "url", rules: [(val) => val?.trim() !== ""] },
    "annotation": { id: "annotation", placeholder: "Аннотация", type: "text", model: "annotation", rules: [(val) => val?.trim() !== ""] },
    "locationid": { id: "locationid", placeholder: "ID локации", type: "text", model: "locationid", rules: [(val) => val?.trim() !== ""] },
    "locationcode": { id: "locationcode", placeholder: "Код локации", type: "text", model: "locationcode", rules: [(val) => val?.trim() !== ""] },
    "locationname": { id: "locationname", placeholder: "Название локации", type: "text", model: "locationname", rules: [(val) => val?.trim() !== ""] },
    "locationenname": { id: "locationenname", placeholder: "Название локации (англ)", type: "text", model: "locationenname", rules: [(val) => val?.trim() !== ""] },
    "start_date": { id: "start_date", placeholder: "Дата начала", type: "date", model: "start_date", rules: [(val) => val?.trim() !== ""] },
    "end_date": { id: "end_date", placeholder: "Дата окончания", type: "date", model: "end_date", rules: [(val) => val?.trim() !== ""] },
    "view_cost": { id: "view_cost", placeholder: "Стоимость просмотра", type: "number", model: "view_cost", rules: [(val) => !isNaN(Number(val)), (val) => val > 0, (val) => Number.isInteger(Number(val))] },
    "link_cost": { id: "link_cost", placeholder: "Стоимость ссылки", type: "number", model: "link_cost", rules: [(val) => !isNaN(Number(val)), (val) => val > 0, (val) => Number.isInteger(Number(val))] },
    "currency": { id: "currency", placeholder: "Валюта", type: "text", model: "currency", rules: [(val) => val?.trim() !== ""] },
    "director_name": { id: "director_name", placeholder: "ФИО директора", type: "text", model: "director_name", rules: [(val) => val?.trim() !== ""] },
    "director_tel": { id: "director_tel", placeholder: "Телефон директора", type: "text", model: "director_tel", rules: [(val) => val?.trim() !== ""] },
    // "balance": { id: "balance", placeholder: "Баланс", type: "number", model: "balance", rules: [(val) => !isNaN(Number(val)), (val) => val > 0, (val) => Number.isInteger(Number(val))] },
    "BANK": { id: "BANK", placeholder: "Банк", type: "text", model: "BANK", rules: [(val) => val?.trim() !== ""] },
}

const inputGenerator = (fieldNames) => {
    let formFields = []
    // Проверяем, является ли fieldNames массивом или объектом
    const fields = Array.isArray(fieldNames) ? fieldNames : Object.keys(fieldNames);

    fields.forEach(field => {
        if (fieldsInfo[field] &&
            !['id', 'created_at', 'updated_at', 'deleted_at'].includes(field)) {
            formFields.push(fieldsInfo[field])
        }
    })

    return formFields
}


export default inputGenerator;
