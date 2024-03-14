export interface ArticleHeaderProps {
  date: string;
  onEdit: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  toggleMenu: () => void;
  menuVisible: boolean;
  bookMark: boolean;
}
