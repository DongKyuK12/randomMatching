import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';


const FriendContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
`;

const FriendTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4ecdc4;
`;

const FriendTableContainer = styled.div`
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
`;

const FriendTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const FriendTableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FriendNumberCell = styled.td`
  width: 80px;
  padding: 15px;
  text-align: center;
  font-weight: 600;
  color: #4ecdc4;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 1.1rem;
`;

const FriendInput = styled.input`
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

const FriendInputCell = styled.td`
  padding: 10px 20px;
`;

const FriendButtonCell = styled.td`
  padding: 8px;
  width: 150px;
`;

const FriendRemoveButton = styled.button`
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

const FriendKeepNumberButton = styled.button`
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

const FriendMatchButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

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
  margin-bottom: 20px;
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

export interface FriendEntry {
  id: number;
  nickname: string;
}

interface FriendSectionProps {
  onFriendMatch: (friendEntries: FriendEntry[]) => void;
  friendsToAdd: FriendEntry[];
  onReset: () => void;
}

const FriendSection: React.FC<FriendSectionProps> = ({ onFriendMatch, friendsToAdd, onReset }) => {
  const [friendEntries, setFriendEntries] = useState<FriendEntry[]>([{ id: 1, nickname: '' }]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // friendsToAdd가 변경될 때 친구 테이블에 추가
  useEffect(() => {
    if (friendsToAdd.length > 0) {
      setFriendEntries(prev => {
        // 현재 입력된 닉네임들만 유지
        const currentNicknames = prev
          .filter(entry => entry.nickname.trim() !== '')
          .map(entry => entry.nickname);
        
        // 새로 추가할 닉네임들
        const newNicknames = friendsToAdd
          .map(friend => friend.nickname)
          .filter(nickname => !currentNicknames.includes(nickname)); // 중복 제거
        
        // 모든 닉네임을 합치고 새로운 번호로 매기기
        const allNicknames = [...currentNicknames, ...newNicknames];
        const newEntries = allNicknames.map((nickname, index) => ({
          id: index + 1,
          nickname: nickname
        }));
        
        // 마지막에 빈 칸 하나 추가
        newEntries.push({ id: newEntries.length + 1, nickname: '' });
        
        return newEntries;
      });
    }
  }, [friendsToAdd]);

  const handleInputChange = (id: number, value: string) => {
    setFriendEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, nickname: value } : entry
      )
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const currentIndex = friendEntries.findIndex(entry => entry.id === id);
      
      if (currentIndex === friendEntries.length - 1) {
        const newId = Math.max(...friendEntries.map(e => e.id)) + 1;
        setFriendEntries(prev => [...prev, { id: newId, nickname: '' }]);
        
        setTimeout(() => {
          const newIndex = friendEntries.length;
          inputRefs.current[newIndex]?.focus();
        }, 0);
      } else {
        inputRefs.current[currentIndex + 1]?.focus();
      }
    }
  };

  const handleRemove = (id: number) => {
    if (friendEntries.length <= 1) return;
    
    const updatedEntries = friendEntries
      .filter(entry => entry.id !== id)
      .map((entry, index) => ({ ...entry, id: index + 1 }));
    
    setFriendEntries(updatedEntries);
  };

  const handleKeepNumberRemove = (id: number) => {
    setFriendEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, nickname: '' } : entry
      )
    );
  };

  const handleFriendMatch = () => {
    onFriendMatch(friendEntries);
  };

  const handleReset = () => {
    setFriendEntries([{ id: 1, nickname: '' }]);
    onReset();
  };

  const handleAddRow = () => {
    const newId = Math.max(...friendEntries.map(e => e.id)) + 1;
    setFriendEntries(prev => [...prev, { id: newId, nickname: '' }]);
    
    setTimeout(() => {
      inputRefs.current[friendEntries.length]?.focus();
    }, 0);
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, friendEntries.length);
  }, [friendEntries.length]);

  return (
    <FriendContainer>
      <TitleRow>
        <FriendTitle>친구 매칭</FriendTitle>
        <ResetButton onClick={handleReset}>초기화</ResetButton>
      </TitleRow>
      <TableSection>
        <FriendTableContainer>
          <FriendTable>
            <tbody>
              {friendEntries.map((entry, index) => (
                <FriendTableRow key={entry.id}>
                  <FriendNumberCell>{entry.id}</FriendNumberCell>
                  <FriendInputCell>
                    <FriendInput
                      ref={el => { inputRefs.current[index] = el; }}
                      type="text"
                      placeholder="닉네임을 입력하세요"
                      value={entry.nickname}
                      onChange={(e) => handleInputChange(entry.id, e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, entry.id)}
                    />
                  </FriendInputCell>
                  <FriendButtonCell>
                    <FriendRemoveButton onClick={() => handleRemove(entry.id)}>
                      한줄 제거
                    </FriendRemoveButton>
                    <FriendKeepNumberButton onClick={() => handleKeepNumberRemove(entry.id)}>
                      번호 남기고 제거
                    </FriendKeepNumberButton>
                  </FriendButtonCell>
                </FriendTableRow>
              ))}
            </tbody>
          </FriendTable>
        </FriendTableContainer>
        <AddRowButtonContainer>
          <AddRowButton onClick={handleAddRow}>+</AddRowButton>
        </AddRowButtonContainer>
        <FriendMatchButton onClick={handleFriendMatch}>
          친구 매칭하기
        </FriendMatchButton>
      </TableSection>
    </FriendContainer>
  );
};

export default FriendSection;





