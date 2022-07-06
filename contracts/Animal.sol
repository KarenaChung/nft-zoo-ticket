// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

abstract contract Ticket {
    function burnTicketForAddress(uint256 typeId, uint256 amount, address burnTokenAddress)
        external
        virtual;

    function balanceOf(address account, uint256 id)
        public
        view
        virtual
        returns (uint256);
}

contract Animal is ERC721, ERC721Enumerable, ERC721Burnable, Ownable, ERC721URIStorage, ReentrancyGuard {
    Ticket private immutable ticket;
    uint256 constant _totalSupply = 20;
    uint256 public MAX_SUPPLY = 20;
    uint[] public _availableTokens;
    uint256 public _numAvailableTokens = 20;

    string baseURI;

    constructor(address ticketAddress) ERC721("Ticket", "TIKT") {
        ticket = Ticket(ticketAddress);
        for(uint i = 0; i<_totalSupply ; i++ ){
            _availableTokens.push(0);
        }
    }

    function mintAnimal() external nonReentrant{
        // require(
        //     this.ownerOf(_token_id) == msg.sender, "not token owner"
        // );
        require(totalSupply() <= MAX_SUPPLY, "Exceed Max Supply");

        uint256 randomNum = uint256(keccak256(abi.encode(block.number, block.difficulty, msg.sender)));
        uint256 randomIndex = randomNum % _numAvailableTokens;
        uint256 result = getAvailableTokenAtIndex(randomIndex, _numAvailableTokens);
        // uint256 tokenId = totalSupply() + 1;
        // ticket.burnTicketForAddress(0, 1, ticket.balanceOf(msg.sender));
        _safeMint(msg.sender, result);
        _numAvailableTokens = _numAvailableTokens - 1;
    }

    
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


    using Strings for uint256;
    bool private _blindBoxOpened = false;
    string private _blindTokenURI =
        "ipfs://QmfTAG9zVD715Q8GMeQ2829dsJhKvFFS8mPX6bD8Jk9A5T";

    function _isBlindBoxOpened() internal view returns (bool) {
        return _blindBoxOpened;
    }

    function setBlindBoxOpened(bool _status) public onlyOwner {
        _blindBoxOpened = _status;
    }

    // this function controls how the token URI is constructed
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (_blindBoxOpened) {
            // string memory baseURI = _baseURI();
            return
                bytes(baseURI).length > 0
                    ? string(
                        abi.encodePacked(baseURI, tokenId.toString(), ".json")
                    )
                    : "";
        } else {
            return _blindTokenURI;
        }
    }

    function getAvailableTokenAtIndex(uint256 indexToUse, uint updatedNumAvailableTokens)
        public
        returns (uint256)
    {
        uint256 valAtIndex = _availableTokens[indexToUse];
        uint256 result;
        if (valAtIndex == 0) {
            // This means the index itself is still an available token
            result = indexToUse;
        } else {
            // This means the index itself is not an available token, but the val at that index is.
            result = valAtIndex;
        }

        uint256 lastIndex = updatedNumAvailableTokens - 1;
        if (indexToUse != lastIndex) {
            // Replace the value at indexToUse, now that it's been used.
            // Replace it with the data from the last index in the array, since we are going to decrease the array size afterwards.
            uint256 lastValInArray = _availableTokens[lastIndex];
            if (lastValInArray == 0) {
                // This means the index itself is still an available token
                _availableTokens[indexToUse] = lastIndex;
            } else {
                // This means the index itself is not an available token, but the val at that index is.
                _availableTokens[indexToUse] = lastValInArray;
                // Gas refund courtsey of @dievardump
            }
            
        }
        _availableTokens.pop();
        
        return result;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


}