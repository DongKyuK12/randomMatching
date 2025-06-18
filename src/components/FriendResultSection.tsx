import React from 'react';
import styled from 'styled-components';

const FriendResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FriendResultTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4ecdc4;
`;

const FriendResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FriendMatchPair = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #4ecdc4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const FriendPlayer = styled.div`
  background: rgba(78, 205, 196, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  color: #4ecdc4;
  word-break: break-all;
`;

const FriendConnectText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const EmptyFriendResultState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin-top: 20px;
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

export interface FriendMatchResult {
  player1: { number: number; nickname: string };
  player2: { number: number; nickname: string };
}

interface FriendResultSectionProps {
  results: FriendMatchResult[];
  onReset: () => void;
}

const FriendResultSection: React.FC<FriendResultSectionProps> = ({ results, onReset }) => {
  return (
    <FriendResultContainer>
      <TitleRow>
        <FriendResultTitle>친구 매칭 결과</FriendResultTitle>
        <ResetButton onClick={onReset}>초기화</ResetButton>
      </TitleRow>
      {results.length > 0 ? (
        <FriendResultList>
          {results.map((result, index) => (
            <FriendMatchPair key={index}>
              <FriendPlayer>
                #{result.player1.number} {result.player1.nickname}
              </FriendPlayer>
              <FriendConnectText>↔</FriendConnectText>
              <FriendPlayer>
                #{result.player2.number} {result.player2.nickname}
              </FriendPlayer>
            </FriendMatchPair>
          ))}
        </FriendResultList>
      ) : (
        <EmptyFriendResultState>
          친구 매칭하기 버튼을 클릭하여 매칭을 시작하세요
        </EmptyFriendResultState>
      )}
    </FriendResultContainer>
  );
};

export default FriendResultSection;

