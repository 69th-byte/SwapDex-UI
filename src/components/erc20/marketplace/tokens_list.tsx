import React from 'react';
import styled, { withTheme } from 'styled-components';

import { getKnownTokens } from '../../../util/known_tokens';
import { getEtherscanLinkForToken } from '../../../util/tokens';
import { Card } from '../../common/card';
import { TokenIcon } from '../../common/icons/token_icon';
import { CustomTD, TokenTD, CustomTDTokenName, THStyled,Table, TH, THead, TR } from '../../common/table';
import { IconType, Tooltip } from '../../common/tooltip';


const TokenIconStyled = styled(TokenIcon)`
    margin: 0 auto 0 0;
`;


const TooltipStyled = styled(Tooltip)`
    flex-wrap: wrap;
    .reactTooltip {
        max-width: 650px;
    }
`;

const TokenEtherscanLink = styled.a`
    align-items: center;
    color: ${props => props.theme.componentsTheme.myWalletLinkColor};
    display: flex;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const WebsiteLink = styled.a`
    align-items: center;
    color: ${props => props.theme.componentsTheme.myWalletLinkColor};
    display: flex;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const TokenName = styled.span`
    font-weight: 700;
    margin-right: 10px;
`;

const TBody = styled.tbody`
    > tr:last-child > td {
        border-bottom: none;
    }
`;

const LabelWrapper = styled.span`
    align-items: center;
    display: flex;
    flex-shrink: 0;
    margin-right: 15px;
`;

class TokensList extends React.PureComponent {
    public render = () => {
        const tokens = getKnownTokens().getTokens();

        const tokensRows = tokens.map((token, index) => {
            const { symbol } = token;
            const website = token.website ? (
                <WebsiteLink href={token.website} target={'_blank'}>
                    {token.website}
                </WebsiteLink>
            ) : (
                '-'
            );

            return (
                <TR key={symbol}>
                    <TokenTD>
                        <TokenIconStyled symbol={token.symbol} primaryColor={token.primaryColor} icon={token.icon} />
                    </TokenTD>
                    <CustomTDTokenName styles={{ borderBottom: true }}>
                        <LabelWrapper>
                            <TokenEtherscanLink href={getEtherscanLinkForToken(token)} target={'_blank'}>
                                <TokenName>
                                    {token.symbol.toUpperCase()} {` - ${token.name}`}
                                </TokenName>
                            </TokenEtherscanLink>
                            <TooltipStyled
                                description={token.description || 'no description'}
                                iconType={IconType.Fill}
                            />
                        </LabelWrapper>
                    </CustomTDTokenName>
                    <CustomTD styles={{ borderBottom: true, textAlign: 'left' }}>{website}</CustomTD>
                </TR>
            );
        });

        let content: React.ReactNode;

        content = (
            <Table isResponsive={true}>
                <THead>
                    <TR>
                        <THStyled>Token</THStyled>
                        <THStyled>{}</THStyled>
                        <THStyled styles={{ textAlign: 'left' }}>Website</THStyled>
                    </TR>
                </THead>
                <TBody>{tokensRows}</TBody>
            </Table>
        );

        return <Card title="Listed Tokens">{content}</Card>;
    };
}

const TokenListWithTheme = withTheme(TokensList);

export { TokensList, TokenListWithTheme };
