// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Ticket is ERC1155, ERC1155Burnable, Ownable, Pausable {
    using Strings for uint256;
    using SafeMath for uint256;
    bool public _isSaleActive = false; //是否開賣
    bool public _revealed = false; //是否開盲盒
    string public notRevealedUri;

    // Constants
    uint256 public constant MAX_SUPPLY = 10; //可被挖出的總數
    // uint256 public mintPrice = 0.3;
    uint256 public maxBalance = 1; //每個地址能擁有1個
    uint256 public maxMint = 1; //每次挖的數量只能1個
    ERC20 public token;
    uint256 public mintPrice = 10000000;
    uint256 public _numAvailableTokens = 1000;

    string private baseURI;
    string public baseExtension = ".json";
    string private startTime; 
    // 2022/6/29 09:00 -> 1656464400

    // mapping(uint256 => string) private _tokenURIs;

    constructor(address tokenAddress, string memory initBaseURI) ERC1155("") {
        token = ERC20(tokenAddress);
        setBaseURI(initBaseURI);
        // setNotRevealedURI(initNotRevealedUri);
        // setStartTime(unixTimestamp);
    }



    function mint(address account, uint256 id, uint256 amount, bytes memory data) public onlyOwner {
        _mint(account, id, amount, data);
    }


    function uri(uint256 typeId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI));
        // return bytes(baseURI).length > 0
        //         ? string(abi.encodePacked(baseURI, typeId.toString(), baseExtension))
        //         : baseURI;
    }

    function mintTicket() public {
        require(token.balanceOf(msg.sender) >= mintPrice, "Not enough token");
        require(_numAvailableTokens > 0, "all drawn");
        require(balanceOf(msg.sender, 0) <= maxBalance, "Sale would exceed max balance");
        token.transferFrom(msg.sender, address(this), mintPrice);
        mint(msg.sender, 0, maxMint, "0x00");
        _numAvailableTokens = _numAvailableTokens.sub(1);
    }

    function burnTicketForAddress(uint256 typeId, uint256 amount, address burnTokenAddress)
        external
    {
        _burn(burnTokenAddress, typeId, amount);
    }

    //only owner
    function flipSaleActive() public onlyOwner {
        _isSaleActive = !_isSaleActive;
    }

    function flipReveal() public onlyOwner {
        _revealed = !_revealed;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function setStartTime(string memory _unixTimestamp) public onlyOwner {
        startTime = _unixTimestamp;
    }

    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(string memory _newBaseExtension)
        public
        onlyOwner
    {
        baseExtension = _newBaseExtension;
    }

    function setMaxBalance(uint256 _maxBalance) public onlyOwner {
        maxBalance = _maxBalance;
    }

    function setMaxMint(uint256 _maxMint) public onlyOwner {
        maxMint = _maxMint;
    }

    function withdraw(address to) public onlyOwner {
        uint256 balance = address(this).balance;
        payable(to).transfer(balance);
    }
}