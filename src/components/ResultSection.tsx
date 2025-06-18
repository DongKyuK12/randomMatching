import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ResultTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #4ecdc4;
`;

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin-top: 50px;
`;

const MatchPair = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #4ecdc4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const MatchContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Player = styled.div`
  background: rgba(78, 205, 196, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  font-weight: 600;
  color: #4ecdc4;
  word-break: break-all;
`;

const ConnectText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

const FriendButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  white-space: nowrap;

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

export interface MatchResult {
  player1: { number: number; nickname: string };
  player2: { number: number; nickname: string };
}

interface ResultSectionProps {
  results: MatchResult[];
  onAddFriend: (pair: MatchResult) => void;
  onReset: () => void;
}

const ResultSection: React.FC<ResultSectionProps> = ({ results, onAddFriend, onReset }) => {
  return (
    <ResultContainer>
      <TitleRow>
        <ResultTitle>추첨 결과</ResultTitle>
        <ResetButton onClick={onReset}>초기화</ResetButton>
      </TitleRow>
      {results.length > 0 ? (
        <ResultList>
          {results.map((result, index) => (
            <MatchPair key={index}>
              <MatchContent>
                <Player>
                  #{result.player1.number} {result.player1.nickname}
                </Player>
                <ConnectText>↔</ConnectText>
                <Player>
                  #{result.player2.number} {result.player2.nickname}
                </Player>
              </MatchContent>
              {result.player2.nickname !== "대기" && (
                <FriendButton onClick={() => onAddFriend(result)}>
                  친구
                </FriendButton>
              )}
            </MatchPair>
          ))}
        </ResultList>
      ) : (
        <EmptyState>
          매칭 버튼을 클릭하여 매칭을 시작하세요
        </EmptyState>
      )}
    </ResultContainer>
  );
};


export default ResultSection;