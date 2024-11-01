<script setup>
import { ref, onMounted } from 'vue';
import { generateClient } from 'aws-amplify/data';

const client = generateClient();

const newNoteTitle = ref('');
const newNoteContent = ref('');
const notes = ref([]);

const fetchNotes = async () => {
  try {
    const { data } = await client.models.Note.list();
    notes.value = data.items;
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

const addNote = async () => {
  if (!newNoteTitle.value.trim() || !newNoteContent.value.trim()) return;
  const note = {
    title: newNoteTitle.value,
    content: newNoteContent.value,
    createdAt: new Date().toISOString(),
  };
  try {
    await client.models.Note.create(note);
    newNoteTitle.value = '';
    newNoteContent.value = '';
    fetchNotes();
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

const deleteNote = async (id) => {
  try {
    await client.models.Note.delete({ id });
    fetchNotes();
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};

onMounted(() => {
  fetchNotes();
});
</script>

<template>
  <div class="notes-container">
    <!-- Add Note Form -->
    <div class="add-note-form">
      <input v-model="newNoteTitle" type="text" placeholder="Note Title" />
      <textarea v-model="newNoteContent" placeholder="Note Content"></textarea>
      <button @click="addNote">Add Note</button>
    </div>

    <!-- Notes List -->
    <div class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-card">
        <h3>{{ note.title }}</h3>
        <p>{{ note.content }}</p>
        <button @click="deleteNote(note.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes-container {
  padding: 20px;
}

.add-note-form {
  margin-bottom: 20px;
}

.add-note-form input,
.add-note-form textarea {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  padding: 8px;
}

.note-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}
</style>
