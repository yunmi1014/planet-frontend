const EDITOR_KEY = 'EDITOR_KEY';

const editorStorage = {
  get() {
    try {
      const rawData = localStorage.getItem(EDITOR_KEY);
      if (!rawData) return null;

      const data: EditorContent = JSON.parse(rawData);

      return data;
    } catch (err) {
      throw new Error('로컬 저장소에서 정보를 가져오지 못했습니다.');
    }
  },

  set(content: EditorContent) {
    try {
      localStorage.setItem(EDITOR_KEY, JSON.stringify(content));
    } catch (err) {
      throw new Error('로컬 저장소에 정보를 저장하지 못했습니다.');
    }
  },

  clear() {
    localStorage.removeItem(EDITOR_KEY);
  },
};

export default editorStorage;
