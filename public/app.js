// eslint-disable-next-line no-undef
// eslint-disable-next-line no-unused-vars
let regNumberApp = new Vue({

    el: '.regNumberApp',
    data: {
        regNumbers: [],
        regNumber: ''
    },
    methods: {
        addRegNumber: function () {
            if (this.regNumber !== '') {
                this.regNumbers.push(this.regNumber);
                this.regNumber = '';
            }
        }
    }
});
