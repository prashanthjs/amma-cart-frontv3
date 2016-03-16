export class AmmaEventEmitterService {

    protected events = {};

    on($scope, event, fn) {
        if (typeof $scope === 'string') {
            fn = event;
            event = $scope;
            $scope = null;
        }
        if (!this.events) {
            this.events = {};
        }
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(fn);
        if ($scope) {
            $scope.$on('$destroy', ()=> {
                this.off(event, fn);
            });
        }
        return this;
    }

    first($scope, event, fn) {
        if (typeof $scope === 'string') {
            fn = event;
            event = $scope;
            $scope = null;
        }
        if (!this.events) {
            this.events = {};
        }
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].unshift(fn);
        if ($scope) {
            $scope.$on('$destroy', ()=> {
                this.off(event, fn);
            });
        }
        return this;
    }

    once($scope, event, fn) {
        if (typeof $scope === 'string') {
            fn = event;
            event = $scope;
            $scope = null;
        }

        const self = this;
        const cb = function () {
            fn.apply(this, arguments);
            self.off(event, cb);
        };

        this.on($scope, event, cb);
        return this;
    }

    emit(event, options, callback) {
        if (callback) {
            return this.emitAsync(event, options, callback);
        } else {
            return this.emitSync(event, options);
        }
    }

    emitSync(event, options) {
        if (!this.events || !this.events[event] || !Array.isArray(this.events[event])) {
            return;
        }
        const listeners = this.events[event].slice(0);
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].call(null, options);
        }
        return this;
    }

    emitAsync(event, options, callback) {
        if (!this.events || !this.events[event] || !Array.isArray(this.events[event])) {
            return callback(null, options);
        }

        async.eachSeries(this.events[event], (fn:any, next) => {
            let err;
            if (fn.length < 2) {
                try {
                    fn.call(this, options);
                }
                catch (e) {
                    err = e;
                }

                return next(err, options);
            }
            fn.call(this, options, next);
        }, function done(err) {
            callback(err, options);
        });
        return this;
    }

    off(event, fn) {

        if (!this.events || !this.events[event] || !this.events[event].length) {
            return this;
        }

        if (!fn) {
            delete this.events[event];
        } else {
            const index = this.events[event].indexOf(fn);
            if (index > -1) {
                this.events[event].splice(index, 1);
            }
        }
        return this;
    }

}
