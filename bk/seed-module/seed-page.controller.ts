/* @ngInject */
export function SeedPageController(SampleRest) {
  var vm = this;
  vm.schema = {
    "type": "object",
      "title": "Comment",
      "properties": {
      "name":  {
        "title": "Name",
          "type": "string"
      },
      "date":  {
        "title": "Date",
          "type": "string",
          "format":"date"
      },
      "email":  {
        "title": "Email",
          "type": "string",
          "pattern": "^\\S+@\\S+$",
          "description": "Email will be used for evil."
      },
      "comment": {
        "title": "Comment",
          "type": "string",
          "maxLength": 20,
          "validationMessage": "Don't be greedy!"
      }
    },
    "required": ["name","email","comment"]
  };
  vm.form = [
    "name",
    "date",
    "email",
    {
      "key": "comment",
      "type": "textarea"
    },
    {
      "type": "submit",
      "style": "btn-info",
      "title": "OK"
    }
  ];
  vm.model = {};
}
