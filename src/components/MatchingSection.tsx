import React from 'react';
import styled from 'styled-components';
import NicknameTable, { type NicknameEntry } from './NicknameTable';

const MatchingContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const MatchingTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4ecdc4;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-top: 20px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ResetButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TableSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AddRowButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddRowButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

interface MatchingSectionProps {
  onEntriesChange: (entries: NicknameEntry[]) => void;
  onMatching: () => void;
  onReset: () => void;
  resetTrigger: number;
}

interface CustomWindow extends Window {
  addNicknameRow?: () => void;
}

const MatchingSection: React.FC<MatchingSectionProps> = ({ onEntriesChange, onMatching, onReset, resetTrigger }) => {
  const handleAddRow = () => {
    const customWindow = window as CustomWindow;
    if (customWindow.addNicknameRow) {
      customWindow.addNicknameRow();
    }
  };

  return (
    <MatchingContainer>
      <TitleRow>
        <MatchingTitle>매칭</MatchingTitle>
        <ResetButton onClick={onReset}>초기화</ResetButton>
      </TitleRow>
      <TableSection>
        <NicknameTable 
          onEntriesChange={onEntriesChange} 
          resetTrigger={resetTrigger}
          onAddRowRequest={() => {}}
        />
        <AddRowButtonContainer>
          <AddRowButton onClick={handleAddRow}>+</AddRowButton>
        </AddRowButtonContainer>
        <Button onClick={onMatching}>매칭 시작</Button>
      </TableSection>
    </MatchingContainer>
  );
};

export default MatchingSection;

