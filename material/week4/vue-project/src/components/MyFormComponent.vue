<script>

export default {
    data() {
        return {
            myText: "My initial text",
            firstName: "",
            lastName: ""
        }
    },
    computed: {
        computedText() {
            return this.myText ? "" : "THis is required field"
        },

        fullName() {
            return this.firstName + " " + this.lastName
        }
    }
}

</script>

<template>

    <form>
        <span id="f1input">{{ computedText }}</span><br />
        <input type="text" aria-describedby="f1input" v-model="myText"></input>

        <br/>
        <br/>
        <input type="text" v-model="firstName"></input><br/>
        <input type="text" v-model="lastName"></input>



    </form>

    <p>The Fullname is {{ fullName }}</p>

</template>

<style>
#f1input {
    color: red;
}
</style>