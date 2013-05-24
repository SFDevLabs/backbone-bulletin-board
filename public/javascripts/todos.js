$(function ($, _, Backbone) {

  "use strict";

  var Post, PostList, Posts, PostView, AppView, App;

  // Post Model
  // ----------

  // Our basic **post** model has `title`, `order`, and `done` attributes.
  Post = Backbone.Model.extend({

    // MongoDB uses _id as default primary key
    idAttribute: "_id",

    // Default attributes for the todo item.
    defaults: function () {
      return {
        title: "empty post...",
        done: false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function () {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title});
      }
    },
    // timeago:function(){
    // },
    // Remove this Todo and delete its view.
    clear: function () {
      this.destroy();
    }
  });

  // Todo Collection
  // ---------------

  PostList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Post,
    // Note that url may also be defined as a function.
    url: function () {
      return "/post" + ((this.id) ? '/' + this.id : '');
    },
  });

  // Create our global collection of **Todos**.
  Posts = new PostList();

  // Todo Item View
  // --------------

  // The DOM element for a todo item...
  PostView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
       "click .toggle"   : "toggleDone",
       "click .edit"  : "edit",
       "click a.destroy" : "clear",
        "click .submit-update"  : "update",
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    },

    // Re-render the titles of the todo item.
    render: function () {
      var JSON=this.model.toJSON()
      JSON.timeAgo=$.timeago(this.model.get("createdAt"))
      this.$el.html(this.template(JSON));
      this.input = this.$('.edit');
      this.bodyEdit = this.$(".title-edit")
      this.titleEdit = this.$(".body-edit")
      return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function () {
      this.model.toggle();
    },
    // If you hit `enter`, we're through editing the item.
    update: function (e) {
        var valuebody = this.bodyEdit.val().trim(),
            valuetitle = this.titleEdit.val().trim();
        if(valuetitle || valuebody) {
          this.model.save({title: valuetitle, body:valuebody});
        }
        this.$el.removeClass('editing');
      // if (e.keyCode === 13) {
      //   this.close();
      // }
    },
    // Remove the item, destroy the model.
    clear: function () {
      this.model.clear();
    },
    edit:function () {
      this.$el.addClass("editing")
      this.titleEdit.val(this.model.get("title"));
      this.bodyEdit.val(this.model.get("body"))
    },

  });

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#app"),
    // Our template for the line of statistics at the bottom of the app.

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-post-title":  "createOnEnter",
     // "click #clear-completed": "clearCompleted",
      //"click #toggle-all": "toggleAllComplete"
      "click .submit"  : "create"

    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos.
    initialize: function () {
      this.inputTitle = this.$("#new-post-title");
      this.inputBody = this.$("#new-post-body");
      Posts.bind('add', this.addOne, this);
      Posts.bind('reset', this.addAll, this);
      Posts.bind('all', this.render, this);
      //this.footer = this.$('footer');
      this.main = $('#main');

      Posts.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
      if (Posts.length) {
        this.main.show();
        //this.footer.show();
      } else {
        this.main.hide();
      }
    },

    // Add a single post item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function (post) {
      var view = new PostView({model: post});
      $("#list").prepend(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function () {
      Posts.each(this.addOne);
    },

    // If you hit return in the main input field, create new **Todo** model
    createOnEnter: function (e) {
      if (e.keyCode !== 13) { return; }
      if (!this.inputTitle.val()) { return; }
      create();
    },
    create:function(){
      Posts.create({title: this.inputTitle.val(),body: this.inputBody.val(), myPost:true, user: {username:"jeffj"}});
      this.inputTitle.val('');
      this.inputBody.val('');
    }
    // toggleAllComplete: function () {
    //   var done = this.allCheckbox.checked;
    //   Posts.each(function (post) { post.save({'done': done}); });
    // }

  });

  // Finally, we kick things off by creating the **App**.
  App = new AppView();

}(jQuery, _, Backbone));