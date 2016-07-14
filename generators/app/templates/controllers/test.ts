import {Controller, DocController, DocAction, Get, Context, Dev, TestRunner} from "kwyjibo";
import * as K from "kwyjibo";

@Dev()
@TestRunner()
@Controller("/test")
@DocController("Generate the test runner paths here")
export default class Test {
}