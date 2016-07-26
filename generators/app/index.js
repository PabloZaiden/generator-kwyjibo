"use strict";
var yeoman = require("yeoman-generator");

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(
      "Hi! Let's create an awesome app with the Kwyjibo generator!"
    );

    var prompts = [{
      type: "input",
      name: "projectName",
      message: "Project name (no spaces)",
      validate: function (title) {
        if (title.indexOf(" ") > 0) {
          return "Project name must not have spaces";
        }

        if (title.trim() === "") {
          return "Project name must not be empty";
        }

        return true;
      }
    },
    {
      type: "confirm",
      name: "auth",
      message: "Do you want to add Passport auth support?",
      default: true
    },
    {
      type: "confirm",
      name: "apiController",
      message: "Do you want to create an API controller?",
      default: true
    },
    {
      type: "confirm",
      name: "devController",
      message: "Do you want to create a Dev controller?",
      default: true
    },
    {
      type: "confirm",
      name: "testController",
      message: "Do you want to create a Test controller?",
      default: true
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath("package.json"),
      this.destinationPath("package.json"),
      this.props
    );
    
    this.fs.copy(
      this.templatePath("tsconfig.json"),
      this.destinationPath("tsconfig.json")
    );

    this.fs.copy(
      this.templatePath("Dockerfile"),
      this.destinationPath("Dockerfile")
    );

    this.fs.copy(
      this.templatePath(".vscode"),
      this.destinationPath(".vscode")
    );
    
    this.fs.copy(
      this.templatePath("public"),
      this.destinationPath("public")
    );

    this.fs.copy(
      this.templatePath("views"),
      this.destinationPath("views")
    );
    
    this.fs.copyTpl(
      this.templatePath("app.ts"),
      this.destinationPath("app.ts"),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("controllers/frontend.ts"),
      this.destinationPath("controllers/frontend.ts"),
      this.props
    );

    if (this.props.apiController) {
      this.fs.copy(
        this.templatePath("controllers/api.ts"),
        this.destinationPath("controllers/api.ts")
      );
    }

    if (this.props.devController) {
      this.fs.copy(
        this.templatePath("controllers/dev.ts"),
        this.destinationPath("controllers/dev.ts")
      );
    }

    if (this.props.testController) {
      this.fs.copy(
        this.templatePath("controllers/test.ts"),
        this.destinationPath("controllers/test.ts")
      );

      this.fs.copy(
        this.templatePath("tests/fixture.ts"),
        this.destinationPath("tests/fixture.ts")
      );
    }
  },

  install: function () {
    this.npmInstall();
    this.installDependencies();
  }
});
