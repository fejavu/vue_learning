Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props:['title'],
});

var app = new Vue({
  el:'#app',
  
  data: {
    message: 'Halo Vue.js',
    seen: true,
    items: [
      {text: "learn Javascript"},
      {text: "learn Vue"},
      {text: "learn Engineering"},
    ],
    
    groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ],

    conObj: {
      Title: 'The old man and the sea',
      Author: '‎Ernest Hemingway',
      PublishedAt: '1952-09-01'
    }
  },

  computed: {
    reversedMsg: function() {
      return this.message.split("").reverse().join("");
    },
    now: function() {
      return Date.now();
    }
  },

  methods: {
    reverseMsg(){
      this.message = this.message.split("").reverse().join("");
    }
  }
});

var watchExampleVm = new Vue({
  el: '#watch-example',

  data: {
    question: '',
    answer: 'There is no answer until you enter something'
  },

  watch: {
    question: function(newQuest, oldQuest) {
      this.answer = 'Waiting for you stop typing';
      this.debouncedGetAnswer();
    }
  },

  created: function() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },

  methods: {
    getAnswer: function() {
      if(this.question.indexOf('?')==0) {
        this.answer = 'Quesction usually contains a mark like "?" ';
        return;
      }

      this.answer = "Thinking";
      var vm = this;

      axios.get("https://yesno.wtf/api")
        .then(function(response) {
          vm.answer = _.capitalize(response.data.answer);
        }).catch(function(error) {
          vm.answer = 'Error! could not reach the API: '+ error;
        });
    }
  }
});

var vueStyleApp = new Vue({
  el:"#vue-style",

  data: {
    classObj: {
      active: false,
      static:true
    },

    inlineStyleObj: {
      'color': 'red',
      'fontSize': '20px',
      'font-weight': 'normal'
    },

    ifAddtoDom:true,
    addtoDom: true
  },

  methods: {
    clickFun: function() {
      this.classObj.active = true;

      vm = this;
      setTimeout(function() {
        vm.classObj.active = false;
      }, 1000);
    },

    beBold: function() {
      this.inlineStyleObj['font-weight'] = 'bold';
      vm = this;
      setTimeout(function() {
        vm.inlineStyleObj['font-weight'] = 'normal';
      },1000)
    },

    toggleVal: function() {
      
      this.ifAddtoDom = !this.ifAddtoDom;
      this.addtoDom = !this.addtoDom;
    }
  }
});

var todoApp = new Vue({
  el: "#todo-list-example",

  data: {
    newTodoText: "",
    todos: [
      {
        id:1,
        title: "Do some dishes"
      },
      {
        id: 2,
        title: "Milk the cunt"
      }
    ],

    nextTodoId: 3
  },

  methods: {
    addTodo: function() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      });

      this.newTodoText = '';
    },

    greet: function(message) {
      alert(message);
    }
  }
});

var formInputApp = new Vue({
  el: "#form-input",

  data: {
    inputMsg: '',
    textAreaMsg:'',
    checked: false,
    picked: '',
    selected: "",
    options: [
      {text: 'one', value: 'A'},
      {text: 'two', value: 'B'},
      {text: 'three', value: 'C'},
      {text: 'four', value: 'D'},
      {text: 'five', value: 'E'},
    ]
  }
});

Vue.component('counter-button',{
  template: '<button v-on:click="addOne">You clicked me {{ count }} times.</button>',
  
  data: function() {
    return {
      count:0
    }
  },

  methods: {
    addOne: function() {
      this.count++;
    }
  }
});

Vue.component('blog-post',{
  props: {
    title: String,
  },
  template: `
  <div class="blog-post">
    <h3>{{ title }}</h3> 
    <button 
      v-on:click="enlargeText"
      >Enlarge Font
    </button>
    <slot></slot>
  <div>`,

  methods: {
    enlargeText: function() {
      this.$emit('enlarge', 0.2)
    }
  }
});

var componentApp = new Vue({
  el: '#componentBasic',
  
  data: {
    blogs: [
      {id: 1, title: 'First view on Vue'},
      {id: 2, title: 'deep into Vue'},
      {id: 3, title: 'A Vue master'},
    ],

    currentComponent: 'Home',
    postFontSize:1,

    buttons: [
      {id:0, text: 'Home', value: 'Home'},
      {id:1, text: 'Post', value: 'Post'},
      {id:2, text: 'Archived', value: 'Archived'},
    ],
    count: 0
  },

  components: {
    Home: {
      template: 
      `<div id='home'>
        <p>This is Home component
          <button v-on:click="oneStep"> Clicked {{ count }} times</button>
        </p>
      </div>
      `,

      data: function() {
        return {
          count:0
        };
      },

      methods: {
        oneStep: function() {
          this.count++;
        }
      }
    },

    Post: {
      template: `<p>This is Post component</p>`,
    },

    Archived: {
      template: `<p>This is Archived component</p>`,
    },
  },

  methods: {
    enlarge: function(enlargeAmount) {
      this.postFontSize += enlargeAmount;
    },

    buttonChange: function(value){
      this.currentComponent = value;
    },
  }
});

Vue.directive('headline', function(el){
  el.style.fontWeight = 'Bold';
  el.focus();
});
var directiveApp = new Vue({
  el: "#directive",
}); 

var getChildrenTextContent = function(children) {
  return children.map(function(node) {
    return node.children 
      ? getChildrenTextContent(node.children)
      : node.text; 
  }).join('');
}

Vue.component('anchored-heading', {
  render: function(createElement) {
    var headingId = getChildrenTextContent(this.$slot.default)
      .toLowerCase()
      .replace(/\W+/g, "-")
      .replace(/(^-|-$)/g,'');

    return createElement();
  }
});

Vue.component('tab-posts', {
  data: function() {
    return {
      posts: [
        { 
        	id: 1, 
          title: 'Cat Ipsum',
          content: '<p>Dont wait for the storm to pass, dance in the rain kick up litter decide to want nothing to do with my owner today demand to be let outside at once, and expect owner to wait for me as i think about it cat cat moo moo lick ears lick paws so make meme, make cute face but lick the other cats. Kitty poochy chase imaginary bugs, but stand in front of the computer screen. Sweet beast cat dog hate mouse eat string barf pillow no baths hate everything stare at guinea pigs. My left donut is missing, as is my right loved it, hated it, loved it, hated it scoot butt on the rug cat not kitten around</p>'
        },       
        { 
        	id: 2, 
          title: 'Hipster Ipsum',
          content: '<p>Bushwick blue bottle scenester helvetica ugh, meh four loko. Put a bird on it lumbersexual franzen shabby chic, street art knausgaard trust fund shaman scenester live-edge mixtape taxidermy viral yuccie succulents. Keytar poke bicycle rights, crucifix street art neutra air plant PBR&B hoodie plaid venmo. Tilde swag art party fanny pack vinyl letterpress venmo jean shorts offal mumblecore. Vice blog gentrify mlkshk tattooed occupy snackwave, hoodie craft beer next level migas 8-bit chartreuse. Trust fund food truck drinking vinegar gochujang.</p>'
        },
        { 
        	id: 3, 
          title: 'Cupcake Ipsum',
          content: '<p>Icing dessert soufflé lollipop chocolate bar sweet tart cake chupa chups. Soufflé marzipan jelly beans croissant toffee marzipan cupcake icing fruitcake. Muffin cake pudding soufflé wafer jelly bear claw sesame snaps marshmallow. Marzipan soufflé croissant lemon drops gingerbread sugar plum lemon drops apple pie gummies. Sweet roll donut oat cake toffee cake. Liquorice candy macaroon toffee cookie marzipan.</p>'
        }
      ],
      selectedPost: null
    }
  },

  template: `
  <div class="posts-tab">
    <ul class="posts-sidebar">
      <li
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:class="{ selected: post === selectedPost }"
        v-on:click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="selected-post-container">
      <div 
        v-if="selectedPost"
        class="selected-post"
      >
        <h3>{{ selectedPost.title }}</h3>
        <div v-html="selectedPost.content"></div>
      </div>
      <strong v-else>
        Click on a blog title to the left to view it.
      </strong>
    </div>
  </div>
`
});

Vue.component('tab-archive', {
  template: `<div> Archive Componet</div>`
});

new Vue({
  el: '#dynamic-component-demo',
  data: {
    currentTab: 'Posts',
    tabs: ['Posts', 'Archive']
  },
  computed: {
    currentTabComponent: function() {
      console.log('tab-' + this.currentTab.toLowerCase());
      return 'tab-' + this.currentTab.toLowerCase();
    }
  }
});