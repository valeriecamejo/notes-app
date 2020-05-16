const notesController = {}
const NoteModel = require('../models/Note')

notesController.getNotes = async (req, res) => {
  const notes = await NoteModel.find()
  res.json(notes)
}

notesController.createNote = async (req, res) => {
  const { title, content, date, author } = req.body
  const newNote = new NoteModel({
    title,
    content,
    date,
    author
  })
  await newNote.save()
  res.json({message: 'Note Saved'})
}

notesController.getNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id)
  res.json(note)
}

notesController.updateNote = async (req, res) => {
  await NoteModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
  res.json({message: 'Note updated'})
}

notesController.deleteNote = async (req, res) => {
  await NoteModel.findByIdAndDelete(req.params.id)
  res.json({message: 'Note deleted'})
}

module.exports = notesController