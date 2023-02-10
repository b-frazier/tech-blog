const User = require('./User');
const BlogPost = require('./BlogPost');

// user can have many posts; if user is deleted, so are their posts
User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// posts can only belong to one user
BlogPost.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, BlogPost };
