import  { useState } from 'react';
import { GlobalStyle, Container, Header, MainContent, MatchingRow, FriendRow, LeftSection, RightSection, Title } from './styles/GlobalStyle';
import MatchingSection from './components/MatchingSection';
import ResultSection, { type MatchResult } from './components/ResultSection';
import FriendSection, { type FriendEntry } from './components/FriendSection';
import FriendResultSection, { type FriendMatchResult } from './components/FriendResultSection';
import type { NicknameEntry } from './components/NicknameTable';

function App() {
  const [entries, setEntries] = useState<NicknameEntry[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [friendResults, setFriendResults] = useState<FriendMatchResult[]>([]);
  const [previousFriends, setPreviousFriends] = useState<Set<string>>(new Set());
  const [friendsToAdd, setFriendsToAdd] = useState<FriendEntry[]>([]);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const handleEntriesChange = (newEntries: NicknameEntry[]) => {
    setEntries(newEntries);
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleMatching = () => {
    // 닉네임이 입력된 항목들만 필터링
    const validEntries = entries.filter(entry => entry.nickname.trim() !== '');
    
    if (validEntries.length < 2) {
      alert('매칭을 위해서는 최소 2명의 닉네임이 필요합니다.');
      return;
    }

    // 배열을 랜덤하게 섞기
    const shuffledEntries = shuffleArray(validEntries);
    
    // 두 명씩 짝지어서 매칭 결과 생성
    const matchResults: MatchResult[] = [];
    
    for (let i = 0; i < shuffledEntries.length - 1; i += 2) {
      if (i + 1 < shuffledEntries.length) {
        matchResults.push({
          player1: {
            number: shuffledEntries[i].id,
            nickname: shuffledEntries[i].nickname
          },
          player2: {
            number: shuffledEntries[i + 1].id,
            nickname: shuffledEntries[i + 1].nickname
          }
        });
      }
    }
    
    // 홀수 개인 경우 마지막 사람은 대기
    if (shuffledEntries.length % 2 === 1) {
      const lastPlayer = shuffledEntries[shuffledEntries.length - 1];
      matchResults.push({
        player1: {
          number: lastPlayer.id,
          nickname: lastPlayer.nickname
        },
        player2: {
          number: 0,
          nickname: "대기"
        }
      });
    }
    
    setResults(matchResults);
  };

  const handleAddFriend = (pair: MatchResult) => {
    const newFriends: FriendEntry[] = [];
    
    // 첫 번째 사람 추가 (번호는 친구 테이블에서 새로 매김)
    newFriends.push({
      id: 0, // 임시 번호, 실제로는 친구 테이블에서 새로 매김
      nickname: pair.player1.nickname
    });
    
    // 두 번째 사람 추가 (대기가 아닌 경우만)
    if (pair.player2.nickname !== "대기") {
      newFriends.push({
        id: 0, // 임시 번호, 실제로는 친구 테이블에서 새로 매김
        nickname: pair.player2.nickname
      });
    }
    
    // 친구 테이블에 추가할 사람들 설정
    setFriendsToAdd(newFriends);
    
    // 이전 친구 관계 기록 (원래 번호로 기록)
    const friendKey1 = `${pair.player1.number}-${pair.player2.number}`;
    const friendKey2 = `${pair.player2.number}-${pair.player1.number}`;
    
    if (pair.player2.nickname !== "대기") {
      setPreviousFriends(prev => new Set([...prev, friendKey1, friendKey2]));
    }
    
    // 추가 후 초기화
    setTimeout(() => {
      setFriendsToAdd([]);
    }, 100);
  };

  const handleFriendMatch = (friendEntries: FriendEntry[]) => {
    const validEntries = friendEntries.filter(entry => entry.nickname.trim() !== '');
    
    if (validEntries.length < 2) {
      alert('친구 매칭을 위해서는 최소 2명의 닉네임이 필요합니다.');
      return;
    }

    // 이전 친구들끼리 매칭되지 않도록 처리하는 로직
    const shuffledEntries = shuffleArray(validEntries);
    const matchResults: FriendMatchResult[] = [];
    const used = new Set<number>();

    for (let i = 0; i < shuffledEntries.length; i++) {
      if (used.has(shuffledEntries[i].id)) continue;

      for (let j = i + 1; j < shuffledEntries.length; j++) {
        if (used.has(shuffledEntries[j].id)) continue;

        const friendKey1 = `${shuffledEntries[i].id}-${shuffledEntries[j].id}`;
        const friendKey2 = `${shuffledEntries[j].id}-${shuffledEntries[i].id}`;

        // 이전에 친구였던 사람들이 아닌 경우 매칭
        if (!previousFriends.has(friendKey1) && !previousFriends.has(friendKey2)) {
          matchResults.push({
            player1: {
              number: shuffledEntries[i].id,
              nickname: shuffledEntries[i].nickname
            },
            player2: {
              number: shuffledEntries[j].id,
              nickname: shuffledEntries[j].nickname
            }
          });

          used.add(shuffledEntries[i].id);
          used.add(shuffledEntries[j].id);
          break;
        }
      }
    }

    // 남은 사람들 처리
    const remaining = shuffledEntries.filter(entry => !used.has(entry.id));
    for (let i = 0; i < remaining.length - 1; i += 2) {
      matchResults.push({
        player1: {
          number: remaining[i].id,
          nickname: remaining[i].nickname
        },
        player2: {
          number: remaining[i + 1].id,
          nickname: remaining[i + 1].nickname
        }
      });
    }

    // 홀수 개인 경우 처리
    if (remaining.length % 2 === 1) {
      const lastPlayer = remaining[remaining.length - 1];
      matchResults.push({
        player1: {
          number: lastPlayer.id,
          nickname: lastPlayer.nickname
        },
        player2: {
          number: 0,
          nickname: "대기"
        }
      });
    }

    setFriendResults(matchResults);
  };

  const handleResetMatching = () => {
    setEntries([]);
    setResults([]);
    setResetTrigger(prev => prev + 1);
  };

  const handleResetResults = () => {
    setResults([]);
  };

  const handleResetFriendMatching = () => {
    setFriendsToAdd([]);
  };

  const handleResetFriendResults = () => {
    setFriendResults([]);
  };



  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>랜덤매칭</Title>
        </Header>
        <MainContent>
          <MatchingRow>
            <LeftSection>
              <MatchingSection 
                onEntriesChange={handleEntriesChange} 
                onMatching={handleMatching}
                onReset={handleResetMatching}
                resetTrigger={resetTrigger}
              />
            </LeftSection>
            <RightSection>
              <ResultSection 
                results={results} 
                onAddFriend={handleAddFriend}
                onReset={handleResetResults}
              />
            </RightSection>
          </MatchingRow>
          <FriendRow>
            <LeftSection>
              <FriendSection 
                onFriendMatch={handleFriendMatch} 
                friendsToAdd={friendsToAdd}
                onReset={handleResetFriendMatching}
              />
            </LeftSection>
            <RightSection>
              <FriendResultSection 
                results={friendResults}
                onReset={handleResetFriendResults}
              />
            </RightSection>
          </FriendRow>
        </MainContent>
      </Container>
    </>
  );
}

export default App;



