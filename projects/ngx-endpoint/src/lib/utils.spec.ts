import { not, join, mergePath, headerGen, HashStore, IHashStore } from './utils';





const suitName = 'Utils';





describe(suitName, function () {

    describe('not', function () {

        it('not true', function () {

            expect(not(false)).toBe(true);
            expect(not(0)).toBe(true);
            expect(not('')).toBe(true);
            expect(not(null)).toBe(true);
            expect(not(void 0)).toBe(true);

        });

        it('not false', function () {

            expect(not(true)).toBe(false);
            expect(not(1)).toBe(false);
            expect(not([])).toBe(false);
            expect(not({})).toBe(false);

        });

    });

});





describe(suitName, function () {

    describe('join', function () {

        it('', function () {

            expect(join('/', [ 1, 2 ])).toBe('1/2');
            expect(join('', [ 1, 2 ])).toBe('12');

            expect(join('-', [ '1', 2 ])).toBe('1-2');

            expect(join('', [ '1', 2 ])).not.toBe('3');
            expect(join('', [ 1, 2 ])).not.toBe(3);

        });

    });

});





describe(suitName, function () {

    describe('mergePath', function () {

        it('normalize path', function () {

            expect(mergePath('/api', '/user')).toBe('/api/user');
            expect(mergePath('/api/', '/user')).toBe('/api/user');
            expect(mergePath('/api', '//user')).toBe('/api/user');
            expect(mergePath('///api//', '//user///')).toBe('/api/user/');

        });

        it('normalize http', function () {

            expect(mergePath('http://foo', '/bar')).toBe('http://foo/bar');
            expect(mergePath('http://foo', 'bar')).toBe('http://foo/bar');
            expect(mergePath('http://foo/', '/bar')).toBe('http://foo/bar');
            expect(mergePath('http://foo/', '//bar')).toBe('http://foo/bar');

        });

        it('normalize https', function () {

            expect(mergePath('https://foo', '/bar')).toBe('https://foo/bar');
            expect(mergePath('https://foo', 'bar')).toBe('https://foo/bar');
            expect(mergePath('https://foo/', '/bar')).toBe('https://foo/bar');
            expect(mergePath('https://foo/', '//bar')).toBe('https://foo/bar');

        });

    });

});





describe(suitName, function () {

    describe('headerGen', function () {

        test('Bearer', function () {
            expect(headerGen.bearer('123')).toEqual({ Authorization: 'Bearer 123'});
            expect(headerGen.bearer('foo')).toEqual({ Authorization: 'Bearer foo'});
        });

        test('Basic', function () {
            expect(headerGen.basic('123')).toEqual({ Authorization: 'Basic 123'});
            expect(headerGen.basic('foo')).toEqual({ Authorization: 'Basic foo'});
        });

    });

});





describe(suitName, function () {

    describe('HashStore', function () {

        let store: IHashStore;

        beforeEach(function () {
            store = HashStore();
        });

        it('init', function () {
            expect(store.clone()).toEqual({});
        });

        test('add one', function () {

            const expected = { foo: 'bar' };

            store.add(expected);

            expect(store.clone()).toEqual(expected);
        });

        test('add more', function () {

            const expected = { foo: 'bar', hello: 'world' };

            store.add(expected);

            expect(store.clone()).toEqual(expected);
        });

        test('add only newest', function () {

            const expected = { foo: 'bar' };

            store.add({ abc: '123' });
            store.add(expected, false);

            expect(store.clone()).toEqual(expected);
        });

        test('add same key', function () {

            const expected = { foo: 'bar' };

            store.add({ foo: 'not bar' });
            store.add(expected);

            expect(store.clone()).toEqual(expected);
        });

        it('not same reference', function  () {

            const expected = { foo: 'bar' };

            store.add(expected);

            expect(store.clone()).not.toBe(expected);
        });

    });

});

