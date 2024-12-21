import useGroupStore from '@/stores/useGroupStore';
import React, { useEffect } from 'react'

const Complated = () => {
    const {
        selectedGroup,
        loadSelectedGroup, // loadSelectedGroup'u store'dan alıyoruz
      } = useGroupStore();
    
      // Component ilk yüklendiğinde localStorage'dan seçilen grubu yükle
      useEffect(() => {
        loadSelectedGroup();
      }, [loadSelectedGroup]);
    
      console.log("Selected Group:", selectedGroup);
  return (
    <div>
               <h1 className="text-3xl bg-red-600 text-white ">{selectedGroup?.name} </h1>

    </div>
  )
}

export default Complated