import { CatDto } from "./cat.dto";

describe('CarDto', ()=>{
    it('should create a catDto as object', (()=>{
        let cat = new CatDto('testcat 1', "testbreed 1", 1);
        expect(new CatDto('testcat 1', "testbreed 1", 1)).toEqual(cat)
    }))
})