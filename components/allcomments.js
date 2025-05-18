 const SUPABASE_URL = 'https://ypnxvddfxubgbqogxmuy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwbnh2ZGRmeHViZ2Jxb2d4bXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTAzNDIsImV4cCI6MjA1OTY2NjM0Mn0.J-ggygd9rFO8mSEMmJ7o_EasckNGUAXhoffGQKuEZEg';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢'];
let allComments = [];
let displayedComments = 1;
let userReactions = {};


async function addComment() {
  const userName = document.getElementById('userName').value.trim();
  const userEmail = document.getElementById('userEmail').value.trim();
  const commentText = document.getElementById('commentInput').value.trim();

  if (!userName || !userEmail || !commentText) {
    alert('Please fill in all fields');
    return;
  }

  const { error } = await supabase.from('comments').insert([
    { user_name: userName, user_email: userEmail, comment_text: commentText }
  ]);

  if (error) {
    alert('Error posting comment: ' + error.message);
    return;
  }


  document.getElementById('userName').value = '';
  document.getElementById('userEmail').value = '';
  document.getElementById('commentInput').value = '';


  loadComments();
}


async function loadComments() {
  const { data, error } = await supabase.from('comments').select('*').order('created_at', { ascending: false });
  if (error) {
    alert('Error loading comments: ' + error.message);
    return;
  }

  allComments = data;
  const commentsSection = document.getElementById('commentsSection');
  const viewAllBtn = document.getElementById('viewAllBtn');
  commentsSection.innerHTML = '';

  if (data.length > 0) {
    for (let i = 0; i < Math.min(displayedComments, data.length); i++) {
      await renderComment(data[i]);
    }
    viewAllBtn.style.display = data.length > displayedComments ? 'inline-block' : 'none';
  }
}


async function renderComment(comment) {
  const { data: replies } = await supabase
    .from('replies')
    .select('*')
    .eq('comment_id', comment.id)
    .order('created_at', { ascending: false });

  const commentsSection = document.getElementById('commentsSection');
  const commentDiv = document.createElement('div');
  commentDiv.className = 'comment';
  commentDiv.dataset.commentId = comment.id;

  const userInitial = comment.user_name.charAt(0).toUpperCase();

  commentDiv.innerHTML = `
    <div class="comment-header">
      <div class="user-avatar">${userInitial}</div>
      <div class="user-name">${comment.user_name}</div>
      <div class="comment-time">${new Date(comment.created_at).toLocaleString()}</div>
    </div>
    <div class="comment-content">${comment.comment_text}</div>
    <div class="comment-actions">
      <button class="reply-btn" onclick="showReplyForm(this)">Reply</button>
      <div class="reactions">
        ${EMOJIS.map(emoji => `
          <button class="reaction-btn" onclick="addReaction(this, '${emoji}')" data-emoji="${emoji}">
            ${emoji} <span class="reaction-count">0</span>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="reply-form">
      <div class="input-group">
        <input type="text" class="input-field reply-name" placeholder="Your Name">
        <input type="email" class="input-field reply-email" placeholder="Your Gmail">
      </div>
      <textarea class="comment-input reply-input" placeholder="Write your reply here..."></textarea>
      <button class="submit-btn" onclick="addReply(this)">Post Reply</button>
    </div>
    <div class="replies">
      ${replies.map(reply => `
        <div class="reply" data-comment-id="${comment.id}">
          <div class="comment-header">
            <div class="user-avatar">${reply.user_name.charAt(0).toUpperCase()}</div>
            <div class="user-name">${reply.user_name}</div>
            <div class="comment-time">${new Date(reply.created_at).toLocaleString()}</div>
          </div>
          <div class="comment-content">${reply.reply_text}</div>
          <div class="reply-actions">
            <div class="reactions">
              ${EMOJIS.map(emoji => `
                <button class="reaction-btn" onclick="addReaction(this, '${emoji}')" data-emoji="${emoji}">
                  ${emoji} <span class="reaction-count">0</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  commentsSection.appendChild(commentDiv);
}


function showReplyForm(button) {
  const replyForm = button.closest('.comment').querySelector('.reply-form');
  replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
}


async function addReply(button) {
  const replyForm = button.parentElement;
  const userName = replyForm.querySelector('.reply-name').value.trim();
  const userEmail = replyForm.querySelector('.reply-email').value.trim();
  const replyText = replyForm.querySelector('.reply-input').value.trim();
  const commentId = button.closest('.comment').dataset.commentId;

  if (!userName || !userEmail || !replyText) {
    alert('Please fill in all fields');
    return;
  }

  const { error } = await supabase.from('replies').insert([
    { comment_id: commentId, user_name: userName, user_email: userEmail, reply_text: replyText }
  ]);

  if (error) {
    alert('Error posting reply: ' + error.message);
    return;
  }

  const repliesSection = replyForm.nextElementSibling;
  const replyDiv = document.createElement('div');
  replyDiv.className = 'reply';
  replyDiv.dataset.commentId = commentId;

  const userInitial = userName.charAt(0).toUpperCase();
  replyDiv.innerHTML = `
    <div class="comment-header">
      <div class="user-avatar">${userInitial}</div>
      <div class="user-name">${userName}</div>
      <div class="comment-time">${new Date().toLocaleString()}</div>
    </div>
    <div class="comment-content">${replyText}</div>
    <div class="reply-actions">
      <div class="reactions">
        ${EMOJIS.map(emoji => `
          <button class="reaction-btn" onclick="addReaction(this, '${emoji}')" data-emoji="${emoji}">
            ${emoji} <span class="reaction-count">0</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  repliesSection.appendChild(replyDiv);

  replyForm.querySelector('.reply-name').value = '';
  replyForm.querySelector('.reply-email').value = '';
  replyForm.querySelector('.reply-input').value = '';
  replyForm.style.display = 'none';
}


function addReaction(button, emoji) {
  const commentDiv = button.closest('.comment') || button.closest('.reply');
  const commentId = commentDiv.dataset.commentId;

  if (!userReactions[commentId]) {
    userReactions[commentId] = { emoji: null, button: null };
  }

  const { emoji: oldEmoji, button: oldButton } = userReactions[commentId];

  if (oldEmoji === emoji) return;


  if (oldButton) {
    const oldCountSpan = oldButton.querySelector('.reaction-count');
    const oldCount = parseInt(oldCountSpan.textContent) || 0;
    oldCountSpan.textContent = Math.max(0, oldCount - 1);
  }


  const newCountSpan = button.querySelector('.reaction-count');
  const newCount = parseInt(newCountSpan.textContent) || 0;
  newCountSpan.textContent = newCount + 1;


  userReactions[commentId] = { emoji, button };
}

function showAllComments() {
  displayedComments = allComments.length;
  loadComments();
}


loadComments();
