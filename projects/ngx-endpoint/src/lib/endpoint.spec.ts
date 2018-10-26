import { Endpoint, IEndpoint } from './endpoint';





describe('Endpoint', function () {

    let endpoint: IEndpoint;

    beforeEach(function () {
        endpoint = Endpoint('/api');
    });




    test('init', function () {
        expect(endpoint).toBeTruthy();
    });

    test('to', function () {

        const random = Math.random().toString();
        const marked = endpoint.to(random);

        expect(marked).toMatch(new RegExp(`${ random }$`));
    });

    test('to original', function () {

        expect(endpoint.to('/info', true)).toBe(endpoint.prefix + '/info');

    });

    test('init with label', function () {

        const random = Math.random().toString();
        const marked = Endpoint('/', { label: random }).to('/info');

        expect(marked).toEqual(expect.stringContaining(random));
    });

    test('calibrate', function () {

        const prefixed = endpoint.to('/info');
        const original = endpoint.to('/info', true);

        expect(endpoint.calibrate(prefixed)).toBe(original);
        //  trigger cache branch for coverage
        expect(endpoint.calibrate(prefixed)).toBe(original);
    });

});

