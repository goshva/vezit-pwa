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
