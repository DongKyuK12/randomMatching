import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #1a1a1a;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    min-width: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 40px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const MatchingRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

export const FriendRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

export const LeftSection = styled.div`
  flex: 1;
  min-width: 400px;
`;

export const RightSection = styled.div`
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// // Button 스타일 제거 (각 컴포넌트에서 개별 관리)
//   background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
//   border: none;
//   border-radius: 8px;
//   color: white;
//   font-size: 1.1rem;
//   font-weight: 600;
//   padding: 15px 30px;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   margin-top: 20px;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
//   }

//   &:active {
//     transform: translateY(0);
//   }
// `;
