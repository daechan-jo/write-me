import { Article } from './Article';

export interface WritingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddArticle: (newArticle: Article) => void;
}
