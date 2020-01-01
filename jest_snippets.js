/**
* @auther: Umesh Nikam
* @description: These are code snippets for jest test cases
*
*/

//expect

    //equality-> .toBe()
    test('two plus two is four', () => {
      expect(2 + 2).toBe(4);
    });

    // .toEqual()
    test('object assignment', () => {
      const data = {one: 1};
      data['two'] = 2;
      expect(data).toEqual({one: 1, two: 2});
    });

    //opposite of a matcher: -> .not.toBe()
    test('adding positive numbers is not zero', () => {
      for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
          expect(a + b).not.toBe(0);
        }
      }
    });

    //Truthiness
    // "toBeNull" matches only null
    // "toBeUndefined" matches only undefined
    // "toBeDefined" is the opposite of toBeUndefined
    // "toBeTruthy" matches anything that an if statement treats as true
    // "toBeFalsy" matches anything that an if statement treats as false
    test('null', () => {
      const n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
    });

    test('zero', () => {
      const z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
    });

    //Numbers
    test('two plus two', () => {
      const value = 2 + 2;
      expect(value).toBeGreaterThan(3);
      expect(value).toBeGreaterThanOrEqual(3.5);
      expect(value).toBeLessThan(5);
      expect(value).toBeLessThanOrEqual(4.5);

      // toBe and toEqual are equivalent for numbers
      expect(value).toBe(4);
      expect(value).toEqual(4);
    });

    test('adding floating point numbers', () => {
      const value = 0.1 + 0.2;
      //expect(value).toBe(0.3);           This won't work because of rounding error
      expect(value).toBeCloseTo(0.3); // This works.
    });

    //Strings-> .toMatch()
    test('there is no I in team', () => {
      expect('team').not.toMatch(/I/);
    });

    test('but there is a "stop" in Christoph', () => {
      expect('Christoph').toMatch(/stop/);
    });

    //Arrays and iterables
    const shoppingList = [
      'diapers',
      'kleenex',
      'trash bags',
      'paper towels',
      'beer',
    ];

    test('the shopping list has beer on it', () => {
      expect(shoppingList).toContain('beer');
      expect(new Set(shoppingList)).toContain('beer');
    });

    //Exceptions
    function compileAndroidCode() {
      throw new Error('you are using the wrong JDK');
    }

    test('compiling android goes as expected', () => {
      expect(compileAndroidCode).toThrow();
      expect(compileAndroidCode).toThrow(Error);

      // You can also use the exact error message or a regexp
      expect(compileAndroidCode).toThrow('you are using the wrong JDK');
      expect(compileAndroidCode).toThrow(/JDK/);
    });

    /*
        //https://jestjs.io/docs/en/expect
        expect(value)
        expect.extend(matchers)
        expect.anything()
        expect.any(constructor)
        expect.arrayContaining(array)
        expect.assertions(number)
        expect.hasAssertions()
        expect.not.arrayContaining(array)
        expect.not.objectContaining(object)
        expect.not.stringContaining(string)
        expect.not.stringMatching(string | regexp)
        expect.objectContaining(object)
        expect.stringContaining(string)
        expect.stringMatching(string | regexp)
        expect.addSnapshotSerializer(serializer)
        .not
        .resolves
        .rejects
        .toBe(value)
        .toHaveBeenCalled()
        .toHaveBeenCalledTimes(number)
        .toHaveBeenCalledWith(arg1, arg2, ...)
        .toHaveBeenLastCalledWith(arg1, arg2, ...)
        .toHaveBeenNthCalledWith(nthCall, arg1, arg2, ....)
        .toHaveReturned()
        .toHaveReturnedTimes(number)
        .toHaveReturnedWith(value)
        .toHaveLastReturnedWith(value)
        .toHaveNthReturnedWith(nthCall, value)
        .toHaveLength(number)
        .toHaveProperty(keyPath, value?)
        .toBeCloseTo(number, numDigits?)
        .toBeDefined()
        .toBeFalsy()
        .toBeGreaterThan(number)
        .toBeGreaterThanOrEqual(number)
        .toBeLessThan(number)
        .toBeLessThanOrEqual(number)
        .toBeInstanceOf(Class)
        .toBeNull()
        .toBeTruthy()
        .toBeUndefined()
        .toBeNaN()
        .toContain(item)
        .toContainEqual(item)
        .toEqual(value)
        .toMatch(regexpOrString)
        .toMatchObject(object)
        .toMatchSnapshot(propertyMatchers?, hint?)
        .toMatchInlineSnapshot(propertyMatchers?, inlineSnapshot)
        .toStrictEqual(value)
        .toThrow(error?)
        .toThrowErrorMatchingSnapshot(hint?)
        .toThrowErrorMatchingInlineSnapshot(inlineSnapshot)
    */

    //https://jestjs.io/docs/en/asynchronous
    //Callbacks
    // Don't do this!
    test('the data is peanut butter', () => {
      function callback(data) {
        expect(data).toBe('peanut butter');
      }

      fetchData(callback);
    });

    test('the data is peanut butter', done => {
      function callback(data) {
        expect(data).toBe('peanut butter');
        done(); //If done() is never called, the test will fail, which is what you want to happen.
      }

      fetchData(callback);
    });

    //Promises
    //Return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.
    test('the data is peanut butter', () => {
      return fetchData().then(data => {
        expect(data).toBe('peanut butter');
      });
    });

    //If you expect a promise to be rejected use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called.
    test('the fetch fails with an error', () => {
      expect.assertions(1);
      return fetchData().catch(e => expect(e).toMatch('error'));
    });

    //.resolves / .rejects
    //.resolves matcher in your expect statement, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.
    test('the data is peanut butter', () => {
      return expect(fetchData()).resolves.toBe('peanut butter');
    });
    //Reject
    test('the fetch fails with an error', () => {
      return expect(fetchData()).rejects.toMatch('error');
    });

    //Async/Await
    //Alternatively, you can use async and await in your tests. To write an async test, use the async keyword in front of the function passed to test
    test('the data is peanut butter', async () => {
      const data = await fetchData();
      expect(data).toBe('peanut butter');
    });

    test('the fetch fails with an error', async () => {
      expect.assertions(1);
      try {
        await fetchData();
      } catch (e) {
        expect(e).toMatch('error');
      }
    });

    //You can combine async and await with .resolves or .rejects.
    test('the data is peanut butter', async () => {
      await expect(fetchData()).resolves.toBe('peanut butter');
    });

    test('the fetch fails with an error', async () => {
      await expect(fetchData()).rejects.toThrow('error');
    });

    //to be continue on https://jestjs.io/docs/en/setup-teardown
    // "beforeEach and afterEach" -> executes after every tests runs
    //                            -> beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code - they can either take a done parameter or return a promise.
    // "beforeAll and afterAll" -> executes once
    beforeEach(() => {
      initializeCityDatabase();
    });

    afterEach(() => {
      clearCityDatabase();
    });

    test('city database has Vienna', () => {
      expect(isCity('Vienna')).toBeTruthy();
    });

    test('city database has San Juan', () => {
      expect(isCity('San Juan')).toBeTruthy();
    });

    //with Promise
    beforeEach(() => {
      return initializeCityDatabase();
    });

    //One-Time Setup
    beforeAll(() => {
      return initializeCityDatabase();
    });

    afterAll(() => {
      return clearCityDatabase();
    });

    test('city database has Vienna', () => {
      expect(isCity('Vienna')).toBeTruthy();
    });

    test('city database has San Juan', () => {
      expect(isCity('San Juan')).toBeTruthy();
    });

    //Scoping
    //By default, the before and after blocks apply to every test in a file.
    //"describe" -> use to group tests together as a block.
    // Applies to all tests in this file
    beforeEach(() => {
      return initializeCityDatabase();
    });

    test('city database has Vienna', () => {
      expect(isCity('Vienna')).toBeTruthy();
    });

    test('city database has San Juan', () => {
      expect(isCity('San Juan')).toBeTruthy();
    });

    describe('matching cities to foods', () => {
      // Applies only to tests in this describe block
      beforeEach(() => {
        return initializeFoodDatabase();
      });

      test('Vienna <3 sausage', () => {
        expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
      });

      test('San Juan <3 plantains', () => {
        expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
      });
    });

    //execution priority.
    //the top-level beforeEach is executed before the beforeEach inside the describe block.
    beforeAll(() => console.log('1 - beforeAll'));
    afterAll(() => console.log('1 - afterAll'));
    beforeEach(() => console.log('1 - beforeEach'));
    afterEach(() => console.log('1 - afterEach'));
    test('', () => console.log('1 - test'));
    describe('Scoped / Nested block', () => {
        beforeAll(() => console.log('2 - beforeAll'));
        afterAll(() => console.log('2 - afterAll'));
        beforeEach(() => console.log('2 - beforeEach'));
        afterEach(() => console.log('2 - afterEach'));
        test('', () => console.log('2 - test'));
    });

    // 1 - beforeAll
    // 1 - beforeEach
    // 1 - test
    // 1 - afterEach
    // 2 - beforeAll
    // 1 - beforeEach
    // 2 - beforeEach
    // 2 - test
    // 2 - afterEach
    // 1 - afterEach
    // 2 - afterAll
    // 1 - afterAll

    //Order of execution of describe and test blocks
    describe('outer', () => {
      console.log('describe outer-a');

      describe('describe inner 1', () => {
        console.log('describe inner 1');
        test('test 1', () => {
          console.log('test for describe inner 1');
          expect(true).toEqual(true);
        });
      });

      console.log('describe outer-b');

      test('test 1', () => {
        console.log('test for describe outer');
        expect(true).toEqual(true);
      });

      describe('describe inner 2', () => {
        console.log('describe inner 2');
        test('test for describe inner 2', () => {
          console.log('test for describe inner 2');
          expect(false).toEqual(false);
        });
      });

      console.log('describe outer-c');
    });

    // describe outer-a
    // describe inner 1
    // describe outer-b
    // describe inner 2
    // describe outer-c
    // test for describe inner 1
    // test for describe outer
    // test for describe inner 2
    // "test.only" -> this will be the only test that runs
    test.only('this will be the only test that runs', () => {
      expect(true).toBe(false);
    });

    test('this test will not run', () => {
      expect('A').toBe('A');
    });//this wont be executed...


//Mock Functions
    //Mock functions allow you to test the links between code by erasing the actual implementation of a function, capturing calls to the function (and the parameters passed in those calls), capturing instances of constructor functions when instantiated with new, and allowing test-time configuration of return values.
    //two ways
        //1.by creating a mock function to use in test code
        //2.writing a manual mock to override a module dependency
    //Using a mock function -> consider forEach function test case
    function forEach(items, callback) {
      for (let index = 0; index < items.length; index++) {
        callback(items[index]);
      }
    }

    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);

    // The mock function is called twice(i.e. array length)
    expect(mockCallback.mock.calls.length).toBe(2);

    // The first argument of the first call to the function was 0
    expect(mockCallback.mock.calls[0][0]).toBe(0);

    // The first argument of the second call to the function was 1
    expect(mockCallback.mock.calls[1][0]).toBe(1);

    // The return value of the first call to the function was 42
    expect(mockCallback.mock.results[0].value).toBe(42);

    //.mock property
        //tells about how the function has been called and what the function returned is kept
        //tracks the value of this for each call, so it is possible to inspect this as well

    const myMock = jest.fn();

    const a = new myMock();
    const b = {};
    const bound = myMock.bind(b);
    bound();

    console.log(myMock.mock.instances);
    // > [ <a>, <b> ]

    // The function was called exactly once
    expect(someMockFunction.mock.calls.length).toBe(1);

    // The first arg of the first call to the function was 'first arg'
    expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

    // The second arg of the first call to the function was 'second arg'
    expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

    // The return value of the first call to the function was 'return value'
    expect(someMockFunction.mock.results[0].value).toBe('return value');

    // This function was instantiated exactly twice
    expect(someMockFunction.mock.instances.length).toBe(2);

    // The object returned by the first instantiation of this function
    // had a `name` property whose value was set to 'test'
    expect(someMockFunction.mock.instances[0].name).toEqual('test');

    //Mock Return Values
    //Mock functions can also be used to inject test values into your code during a test
    const myMock = jest.fn();
    console.log(myMock());
    // > undefined

    myMock
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('x')
      .mockReturnValue(true);

    console.log(myMock(), myMock(), myMock(), myMock());
    // > 10, 'x', true, true

    //Mock functions are also very effective in code that uses a functional continuation-passing style.
    const filterTestFn = jest.fn();

    // Make the mock return `true` for the first call,
    // and `false` for the second call
    filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

    const result = [11, 12].filter(num => filterTestFn(num));

    console.log(result);
    // > [11]
    console.log(filterTestFn.mock.calls);
    // > [ [11], [12] ]

//Mocking Modules
    // users.js
    import axios from 'axios';

    class Users {
      static all() {
        return axios.get('/users.json').then(resp => resp.data);
      }
    }

    export default Users;
    //create jest.mock(...) function to automatically mock the axios module w/o hitting actual API

    // users.test.js
    import axios from 'axios';
    import Users from './users';

    jest.mock('axios');

    test('should fetch users', () => {
        const users = [{name: 'Bob'}];
        const resp = {data: users};
        axios.get.mockResolvedValue(resp);

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        return Users.all().then(data => expect(data).toEqual(users));
    });

//Mock Implementations
    //"mockImplementation" -> method is useful when you need to define the default implementation of a mock function that is created from another module

    // foo.js
    module.exports = function() {
      // some implementation;
    };

    // test.js
    jest.mock('../foo'); // this happens automatically with automocking
    const foo = require('../foo');

    // foo is a mock function
    foo.mockImplementation(() => 42);
    foo();
    // > 42

    //"mockImplementationOnce" -> used When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results
    const myMockFn = jest
      .fn()
      .mockImplementationOnce(cb => cb(null, true))
      .mockImplementationOnce(cb => cb(null, false));

    myMockFn((err, val) => console.log(val));
    // > true

    myMockFn((err, val) => console.log(val));
    // > false

    //Or

    const myMockFn = jest
      .fn(() => 'default')
      .mockImplementationOnce(() => 'first call')
      .mockImplementationOnce(() => 'second call');

    console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
    // > 'first call', 'second call', 'default', 'default