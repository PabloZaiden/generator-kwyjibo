import {DocController, DocAction, Get, Post, Context, ActionMiddleware, Controller} from "kwyjibo";
import * as K from "kwyjibo";
import App from "../app";

@Controller("/frontend")
@DocController("Sample frontend Controller.")
class Root {

    @Get("/")
    @DocAction(`Sample index`)
    index(context: Context): void {
        context.response.render("helloworld");
    }

    @Get("/authenticate")
    login(context: Context): void {
        context.response.render("login");
    }

    <%if (auth) {%>
    @Post("/authenticate")
    @DocAction(`Action that triggers the authentication middleware`)
    @ActionMiddleware(App.authenticate)
    goToAuthentication(context: Context): void {
        // once you get here, the user will be successfully authenticated
        context.response.redirect(K.getActionRoute(Root, "onlyForUsers"));
    }

    @Get("/authorized")
    @DocAction(`Action that verifies that a user is authorized`)
    @ActionMiddleware(App.authorize)
    onlyForUsers(context: Context): void {
        context.response.render("authorized");
    }
    <%}%>
}