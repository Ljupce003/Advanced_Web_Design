<script>
import { computed, ref } from 'vue';

let objArr = [1, 2, 3, 4, 5].map(num => ({ number: num, randN : Math.random() * num + Math.random() * 100 ,toDisplay: !!Math.round(Math.random())}))



// let count = ref(0);

export default {


    data() {
        return {
            myText: "This is my textTyyyy",
            count: 0,
            myArr: [1, 2, 3, 4, 5],
            objectArr: [...objArr]

        };
    },
    methods: {
        increment() {
            this.count += 1;
        },
        getDate() {
            alert(Date.now())
        }
    },
    computed: {
        computedMyText(){
            return this.myText + "-computed"
        },
        computedVar: {
            get() {
                return this.myText + " - computed123"
            },
            set (val){
                this.myText = val
            }
        }
    },
    // We can assign watcher to a variable and observe its changes
    watch: { 
        myText: {
            handler: function(newVal,oldVal){
                console.log(`Value changed to ${newVal} from ${oldVal}`);
                
            },
            deep: true,
            immediate: true
        }
    }
}



</script>

<template>
    <h1>hello This is my component</h1>
    <p>Test Test 1,2,3</p>

    <p> The variable text is {{ myText }}</p>
    The count is {{ count }}

    <button @click="increment">
        Increment
    </button>

    <br />

    <!-- Binds a property to be the content of a text dispay tag -->
    <p v-text="count"></p>


    <div v-once> <!-- Renders At beginning and then it doesnt update anything -->
        <h5>Count: {{ count }}</h5>
        <h5>Text: {{ myText }}</h5>
    </div>

    <!-- v-bind:propery or :propery one way binds(if is changed on client side, it wont be in the
    state side changed) values to the tag element -->
    <input type="button" v-bind:value="myText"></input>
    <br />
    <input type="text" :value="myText"></input>


    <!-- renders based on condition -->
    <div v-if="count">
        <p>Value is greated than 0</p>
    </div>

    <!-- v-show still renders it compared to v-if but it sets ot display:none -->
    <input type="text" v-show="myText" v-model="myText"></input>

    <!-- Additionally in the upper tag, v-model is used, it is for two way binding(changes to the variables both 
     affect the state and the html display) -->

    <!-- v-for generates multiple tags in a for cycle -->
    <div>
        <p v-for="el in myArr" :key="`loop1 ${el}`">
            {{ el }}</p>
    </div>



    <!-- This is a computed property, different from the ones in the data() object becuase these 
     usually are computed from the data() object properties, and change when those properties change -->
    <p>{{ computedMyText }}</p>



    <div>
        <p v-for="obj in objectArr" :key="`loop2 ${obj.number}`">
            <span v-text="obj.number" style="color: green;"></span><span>  -=-=- </span>
            <span v-text="obj.randN" style="color: blue;"></span>
            <span v-if="obj.toDisplay"> This is private text</span>
        </p>
    </div>


    <!-- computed properties by default only have 'getter', but we can define 'setters' too, 
     look how the value of this computed property changes(is set) after a input click -->
    <input type="button" @click="() => computedVar = 'Mal'" value="Reset Computed"></input>

    <p>{{ computedVar }}</p>

    <input type="button" @click="getDate" value="Get the date"></input>



</template>

<style></style>