import * as K from "kwyjibo"

@K.Fixture()
export default class Fixture {
    @K.Before()
    prepare(): void {
        // this method will run before the tests
    }

    @K.Test("A test that passes")
    test1(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (1 !== 1) {
                reject (new Error("equality is failing!!!"))
            } else {
                resolve();
            }
        });
    }

    @K.Test("A test that fails")
    test2(): void {
        throw new Error("failed test!");
    }

    @K.After()
    cleanUp(): void {
        // this method will run after the tests
    }
}