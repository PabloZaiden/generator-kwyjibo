import * as K from "kwyjibo"

@K.Fixture()
export default class Fixture {
    @K.Before()
    prepare(): void {
        // this method will run before the tests
    }

    @K.Test("A test that passes")
    test1(): void {
        // this test will pass
    }

    @K.Test("A test that fails")
    test2(): void {
        throw new Error('failed test!');
    }

    @K.After()
    cleanUp(): void {
        // this method will run after the tests
    }
}