import * as Express from "express";
import {Controller, DocController, DocAction, Get, Post, ExpressCompatible, Context} from "kwyjibo";

@Controller("/api")
@DocController("Sample API Controller.")
class Api {

    @DocAction(`Responds "OK" when accessed.`)
    ping(context: Context): Object {
        return { response: "OK" };
    }

    @Post()
    @DocAction("Echoes the received body")
    echo(context: Context): void {
        context.response.send(context.request.body);
    }

}