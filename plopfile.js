module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'base component generator',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Insert component name',
    }],
    actions: [
      {
        path: `src/components/{{name}}/index.tsx`,
        templateFile: `templates/component/index.tsx.hbs`,
        type: 'add',
      },
      {
        path: `src/components/{{name}}/styles.scss`,
        templateFile: `templates/component/styles.scss.hbs`,
        type: 'add',
      }, {
        path: `src/components/{{name}}/index.test.tsx`,
        templateFile: `templates/component/index.test.tsx.hbs`,
        type: 'add',
      }
    ]
  });
};

