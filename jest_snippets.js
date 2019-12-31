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