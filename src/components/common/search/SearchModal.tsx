import RecentSearchList from './RecentSearchList';
import SearchInput from './SearchInput';

type SearchModalProps = {
  onClose: () => void;
};

export default function SearchModal({ onClose }: SearchModalProps) {
  return (
    <>
      <div className="bg-[var(--white)] z-50 pt-5">
        <SearchInput onClose={onClose} />
        <RecentSearchList />
      </div>
    </>
  );
}
