// Создаем список полей для формы 
// key должен совпадать с названием поля в базе данных и с id
// поле должно содержать id, placeholder, type, model, rules


const fieldsInfo ={
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
        rules: [(val) => /^\d{10}$/.test(val)]
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
    "OGRN": { id: "OGRN", placeholder: "ОГРН", type: "text", model: "OGRN", rules: [(val) => val?.trim() !== "" ]},
    "bussines": { id: "bussines", placeholder: "Название компании", type: "text", model: "bussines", rules: [(val) => val?.trim() !== ""] },
    "description": { id: "description", placeholder: "Описание", type: "text", model: "description", rules: [(val) => val?.trim() !== ""] },
    "contactName": { id: "contactName", placeholder: "Директор (ФИО)", type: "text", model: "contactName", rules: [(val) => val?.trim() !== ""] },
    "actualAddress": { id: "actualAddress", placeholder: "Фактический адрес", type: "text", model: "actualAddress", rules: [(val) => val?.trim().length <= 512] },
    "OKVED": { id: "OKVED", placeholder: "Вид деятельности", type: "text", model: "OKVED", rules: [(val) => val?.trim().length <= 512] },
    "contactTel": { id: "contactTel", placeholder: "Контактный телефон", type: "text", model: "contactTel", rules: [(val) => val?.trim() !== ""] },
    "contactEMail": { id: "contactEMail", placeholder: "Электронная почта", type: "email", model: "contactEMail", rules: [(val) => /^\S+@\S+\.\S+$/.test(val)] },
    "legalAddress": { id: "legalAddress", placeholder: "Юридический адрес", type: "text", model: "legalAddress", rules: [(val) => val?.trim().length <= 512] },
    "equipid": { id: "equipid", placeholder: "ID оборудования", type: "text", model: "equipid", rules: [(val) => val?.trim() !== ""] },
    "sid": { id: "sid", placeholder: "ID сервиса", type: "text", model: "sid", rules: [(val) => val?.trim() !== ""] },
    "apikey": { id: "apikey", placeholder: "API ключ", type: "text", model: "apikey", rules: [(val) => val?.trim() !== ""] },
    "ver": { id: "ver", placeholder: "Версия", type: "text", model: "ver", rules: [(val) => val?.trim() !== ""] },
    "dsc": { id: "dsc", placeholder: "Описание", type: "text", model: "dsc", rules: [(val) => val?.trim() !== ""] },
    "listing": { id: "listing", placeholder: "Список", type: "text", model: "listing", rules: [(val) => val?.trim() !== ""] },
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
