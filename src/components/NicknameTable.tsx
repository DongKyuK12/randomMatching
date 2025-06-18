import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const NumberCell = styled.td`
  width: 80px;
  padding: 15px;
  text-align: center;
  font-weight: 600;
  color: #4ecdc4;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
`;

const InputCell = styled.td`
  padding: 10px 20px;
`;

const NicknameInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.1rem;
  padding: 10px;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
`;

const ButtonCell = styled.td`
  padding: 8px;
  width: 150px;
`;

const RemoveButton = styled.button`
  background: #ff6b6b;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  padding: 4px 8px;
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.2s ease;

  &:hover {
    background: #ff5252;
    transform: scale(1.05);
  }
`;

const KeepNumberButton = styled.button`
  background: #ffa726;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #ff9800;
    transform: scale(1.05);
  }
`;

export interface NicknameEntry {
  id: number;
  nickname: string;
}

interface NicknameTableProps {
  onEntriesChange: (entries: NicknameEntry[]) => void;
  resetTrigger: number;
  onAddRowRequest?: () => void;
}

const NicknameTable: React.FC<NicknameTableProps> = ({ onEntriesChange, resetTrigger, onAddRowRequest }) => {
  const [entries, setEntries] = useState<NicknameEntry[]>([{ id: 1, nickname: '' }]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 외부에서 행 추가 요청 시 처리
  useEffect(() => {
    if (onAddRowRequest) {
      const addRow = () => {
        const newId = Math.max(...entries.map(e => e.id)) + 1;
        const updatedEntries = [...entries, { id: newId, nickname: '' }];
        setEntries(updatedEntries);
        onEntriesChange(updatedEntries);
        
        setTimeout(() => {
          inputRefs.current[entries.length]?.focus();
        }, 0);
      };

      // 함수를 외부에서 접근 가능하도록 설정
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).addNicknameRow = addRow;
    }
  }, [entries, onEntriesChange, onAddRowRequest]);

  // 초기화 트리거가 변경될 때 테이블 초기화
  useEffect(() => {
    if (resetTrigger > 0) {
      const initialEntries = [{ id: 1, nickname: '' }];
      setEntries(initialEntries);
      onEntriesChange(initialEntries);
    }
  }, [resetTrigger, onEntriesChange]);

  const handleInputChange = (id: number, value: string) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, nickname: value } : entry
    );
    setEntries(updatedEntries);
    onEntriesChange(updatedEntries);
  };

 
  // 외부에서 호출할 수 있도록 함수를 전역에 노출
  useEffect(() => {
  const addNewRow = () => {
    const newId = Math.max(...entries.map(e => e.id)) + 1;
    const updatedEntries = [...entries, { id: newId, nickname: '' }];
    setEntries(updatedEntries);
    onEntriesChange(updatedEntries);
    
    setTimeout(() => {
      inputRefs.current[entries.length]?.focus();
    }, 0);
  };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).addRowToNicknameTable = addNewRow;
  }, [entries, onEntriesChange]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, entries.length);
  }, [entries.length]);

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentIndex = entries.findIndex(entry => entry.id === id);
      
      if (currentIndex === entries.length - 1) {
        // 마지막 항목에서 엔터를 누르면 새로운 행 추가
        const newId = Math.max(...entries.map(e => e.id)) + 1;
        const updatedEntries = [...entries, { id: newId, nickname: '' }];
        setEntries(updatedEntries);
        onEntriesChange(updatedEntries);
        
        // 새로 추가된 입력 필드로 포커스 이동
        setTimeout(() => {
          const newIndex = entries.length;
          inputRefs.current[newIndex]?.focus();
        }, 0);
      } else {
        // 다음 입력 필드로 포커스 이동
        inputRefs.current[currentIndex + 1]?.focus();
      }
    }
  };

  const handleRemove = (id: number) => {
    if (entries.length <= 1) return;
    
    const updatedEntries = entries
      .filter(entry => entry.id !== id)
      .map((entry, index) => ({ ...entry, id: index + 1 })); // 번호 다시 매기기
    
    setEntries(updatedEntries);
    onEntriesChange(updatedEntries);
  };

  const handleKeepNumberRemove = (id: number) => {
    const updatedEntries = entries.map(entry => 
      entry.id === id ? { ...entry, nickname: '' } : entry
    );
    
    setEntries(updatedEntries);
    onEntriesChange(updatedEntries);
  };

  return (
    <TableContainer>
      <Table>
        <tbody>
          {entries.map((entry, index) => (
            <TableRow key={entry.id}>
              <NumberCell>{entry.id}</NumberCell>
              <InputCell>
                <NicknameInput
                  ref={el => { inputRefs.current[index] = el; }}
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={entry.nickname}
                  onChange={(e) => handleInputChange(entry.id, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, entry.id)}
                />
              </InputCell>
              <ButtonCell>
                <RemoveButton onClick={() => handleRemove(entry.id)}>
                  한줄 제거
                </RemoveButton>
                <KeepNumberButton onClick={() => handleKeepNumberRemove(entry.id)}>
                  번호 남기고 제거
                </KeepNumberButton>
              </ButtonCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default NicknameTable;