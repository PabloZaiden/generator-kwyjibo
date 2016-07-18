'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      "Hi! Let's create an awesome app with the " + chalk.red('kwyjibo') + " generator!"
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project name'
    },
    {
      type: 'confirm',
      name: 'apiController',
      message: 'Do you want to create a sample API controller?',
      default: true
    },
    {
      type: 'confirm',
      name: 'devController',
      message: 'Do you want to create a sample Dev controller?',
      default: true
    },
    {
      type: 'confirm',
      name: 'testController',
      message: 'Do you want to create a Test controller?',
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('.vscode'),
      this.destinationPath('.vscode')
    );
    
    this.fs.copyTpl(
      this.templatePath('app.ts'),
      this.destinationPath('app.ts'),
      this.props
    );

    this.fs.copy(
      this.templatePath('controllers/frontend.ts'),
      this.destinationPath('controllers/frontend.ts')
    );

    if (this.props.apiController) {
      this.fs.copy(
        this.templatePath('controllers/api.ts'),
        this.destinationPath('controllers/api.ts')
      );
    }

    if (this.props.devController) {
      this.fs.copy(
        this.templatePath('controllers/dev.ts'),
        this.destinationPath('controllers/dev.ts')
      );
    }

    if (this.props.testController) {
      this.fs.copy(
        this.templatePath('controllers/test.ts'),
        this.destinationPath('controllers/test.ts')
      );

      this.fs.copy(
        this.templatePath('tests/fixture.ts'),
        this.destinationPath('tests/fixture.ts')
      );
    }
  },

  install: function () {
    this.npmInstall(['kwyjibo', 'cookie-parser', 'body-parser', 'express', 'debug', 'require-all']);
    this.installDependencies();
  }
});
