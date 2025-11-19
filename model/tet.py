class TreeNode(object):
    def __init__(self, val=0, left=None, right=None):
        self.data = val
        self.left = left
        self.right = right

class Binary_s_tree:
    def __init__(self):
        self.root=None
        
    def insert(self,val):
        if self.root is None:
            self.root=TreeNode(val)   
          
        return self.__insert(self.root,val)
    def __insert(self,curr_node,val):
        if curr_node is None:
            curr_node=TreeNode(val)
       
        if curr_node.data>val:   
            curr_node.left=self.__insert(curr_node.left,val)      
        if curr_node.data<val:
            curr_node.right=self.__insert(curr_node.right,val)
        return curr_node.data
        
    # def bottom(self):    
    #     lvl=float('inf');ctr=0;ans=[]
    #     self.bottomView(self.root,lvl,ctr,ans)
    #     return ans
        
    # def bottomView(self, curr,lvl,ctr,ans):
    #     if curr is not None:
    #         if ctr==lvl:
    #             ans.append(curr.data)
    #         if curr.left is None or curr.right is None:
    #             ans.append(curr.data)
    #         ctr+=1
    #         self.bottomView(curr.left,lvl,ctr,ans)
    #         self.bottomView(curr.right,lvl,ctr,ans)

    #     elif curr is None and lvl>ctr:
    #         lvl=ctr
            
    #     return 
    
    def top_view(self):
        ans=[]
        return self.top(self.root,False,ans)
    def top(self,curr,done,ans):
        if curr is not None:
            return
        if done==False:
            self.top(curr.left,done,ans)
            ans.append(curr.val)
        if curr==self.root:
            curr=curr.right
            done=True
        if done==True:
            ans.append(curr.val)
            self.top(curr.right,done,ans)
        return 

    
tree=Binary_s_tree()
print(tree.insert(20))
print(tree.insert(2))
print(tree.insert(22))
print(tree.insert(5))
print(tree.insert(3))
print(tree.insert(4))
print(tree.insert(25))
print(tree.insert(10))
print(tree.insert(14))

# print(tree.bottom())
tree.annotate()
tree.top_view()