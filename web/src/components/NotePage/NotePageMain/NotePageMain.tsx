import styles from './NotePageMain.module.scss';
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css'; 

interface NotePageMainProps {
  title: string,
  mainText: string,
  onSetTitle: React.Dispatch<React.SetStateAction<string>>,
  onSetMainText: React.Dispatch<React.SetStateAction<string>>
}

const NotePageMain: React.FC<NotePageMainProps> = ({ title, mainText, onSetTitle, onSetMainText }) => {

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 
    'bold', 
    'italic', 
    'underline', 
    'strike', 
    'blockquote',
    'list', 
    'indent', 
  ];


  return (
    <div className={styles.notePageMain}>
      <input 
        className={styles.titleInput}
        style={{
          backgroundColor: 'transparent'
        }}
        type="text" 
        placeholder='Title'
        value={title}
        onChange={(e) => onSetTitle(e.target.value)}
      />
      <ReactQuill 
        className={styles.quill}
        theme="snow" 
        value={mainText} 
        onChange={onSetMainText}
        modules={modules}
        formats={formats}
        placeholder="Note"
      />
    </div>
  )
}

export default NotePageMain;